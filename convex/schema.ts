import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        content: v.optional(v.string()),
        isPublished: v.boolean(),
        subject: v.optional(v.string()),
        parentDocument: v.optional(v.id("documents")),
        isFolder: v.boolean(),
        isArchived: v.optional(v.boolean()),
    })
    .index("by_user", ["userId"])
    .index("by_parent_document", ["userId", "parentDocument"])
})