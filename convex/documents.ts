import { v } from "convex/values"
import {mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"


export const archive = mutation({
    args: {id: v.id("documents")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }
        const userId = identity.subject

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument){
            throw new Error("Not Found")
        }

        if (existingDocument.userId != userId){
            throw new Error("Unauthorised")
        }
        const recursiveArchive = async ( documentId: Id<"documents">) => {
            const children = await ctx.db
            .query("documents")
            .withIndex("by_parent_document", (q) => (
                q
                .eq("userId", userId)
                .eq("parentDocument", documentId)
            ))
            .collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true
                })
                await recursiveArchive(child._id)
            }
        }
        
        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })

    }
})

export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }
        const userId = identity.subject
        
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_parent_document", (q) => 
            q 
            .eq("userId", userId)
            .eq("parentDocument", args.parentDocument)
            )
            .order("desc")
            .filter((q)=>
            q.eq(q.field("isArchived"), false)
            )
            .collect()
        return documents
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        folder: v.boolean(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
const identity = await ctx.auth.getUserIdentity();
if (!identity){
    throw new Error("Not authenticated")
}
    const userId = identity.subject
    const document = await ctx.db.insert("documents", {
        title: args.title,
        userId,
        isPublished: false,
        isFolder: args.folder,
        parentDocument: args.parentDocument,
        isArchived: false,
    })

return document
    }
})

export const getTrash = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }
        const userId = identity.subject 
        
        const documents = await ctx.db
        .query("documents")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .filter((q)=>
        q.eq(q.field("isArchived"), true)
    )
    .order("desc")
    .collect()
    return documents
    }
})

export const restore = mutation({
    args: {id:v.id("documents")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }
        const userId = identity.subject 
    
        const existingDocument = await ctx.db.get(args.id)

        if(!existingDocument) {
            throw new Error("Not Found")
        }
        if (existingDocument.userId !== userId){
            throw new Error("Unauthorised")
        }
        
        const options = {
            isArchived: false,
        }

        const recursiveRestore = async(documentId) => {
            const children = await ctx.db
            .query("documents")
            .withIndex("by_parent_document", (q) => (
                q
                .eq("userId",userId)
                .eq("parentDocument", documentId)
            ))
            .collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: false
                })
                await recursiveRestore(child._id)
            }
        }
        if(existingDocument.parentDocument){
            const parent = await ctx.db.get(existingDocument.parentDocument)
            if (parent?.isArchived){
                options.parentDocument = undefined
            }
        }
        const document = await ctx.db.patch(args.id, options)
        recursiveRestore(args.id)
        return document
    }
})

export const remove = mutation({
    args: {id: v.id("documents")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }
        const userId = identity.subject 

        const existingDocument = await ctx.db.get(args.id)
        if(!existingDocument) {
            throw new Error("Not Found")
        }
        if (existingDocument.userId !== userId){
            throw new Error("Unauthorised")
        }
        const document = await ctx.db.delete(args.id)
        return document
    }
})