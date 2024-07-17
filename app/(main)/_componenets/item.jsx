"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronDown, ChevronRight,LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/clerk-react"
export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
    isFolder
}) => {
    const {user }= useUser()
    const create = useMutation(api.documents.create)
    const archive = useMutation(api.documents.archive)
    const onArchive = (event) => {
        event.stopPropagation()
        if (!id) return
        const promise = archive({id})
        toast.promise(promise, {
            loading: "Moving to archive...",
            success: "Note moved to archive!",
            error: "Failed to archive note."
        })
    }
    const router = useRouter()
    const handleExpand = (event) => {
        event.stopPropagation()
        onExpand()
    }
    const onCreate = (event) =>{
        event.stopPropagation()
        if (!id) return
        const promise = create({title: "Untitled", parentDocument: id, folder: false})
        .then((parentDocumentId) => {
            if (!expanded) {
                onExpand?.()
            }
            //router.push(`/documents/${documentId}`)
        })
        toast.promise(promise, {
            loading: "Creating new note...",
            success: "New note created!",
            error: "Failed to create new note."
        })
    }

    const onCreateFolder = (event) =>{
        event.stopPropagation()
        if (!id) return
        const promise = create({title: "Folder", parentDocument: id, folder: true})
        .then((parentDocumentId) => {
            if (!expanded) {
                onExpand?.()
            }
            //router.push(`/documents/${documentId}`)
        })
        toast.promise(promise, {
            loading: "Creating new note...",
            success: "New note created!",
            error: "Failed to create new note."
        })

    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight
    return(
        <div
        onClick={onClick}
        role="button"
        style={{
            paddingLeft: level ? `${(level*12)+12}px` : "12px"
        }}
        className={cn(
            "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
        )}
        >
            {!!id && isFolder ? (
                <div
                role="button"
                className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                onClick={handleExpand}
                >
                    <ChevronIcon 
                    className="h-4 w-4 shrink-0 text-muted-foreground/50"
                    />
                </div>
            )  : (<><div className="h-4 w-4"></div></>)}
            

         {documentIcon ? (
                <div className="shrink=0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
            <Icon className="shrink-0 h-[18px] mr-2" /> )}
            <span className="truncate">
            {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>k
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">  
                <DropdownMenu>
                    <DropdownMenuTrigger
                    onClick={(e) => e.stopPropagation()}
                    asChild
                    >
                        <div
                        role="button"
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                        >
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                        </div>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent
                        className="w-40"
                        align='start'
                        slide="right"
                        forceMount>
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2"/>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs p-2 text-muted-foreground">
                                Last edited by: {user.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {isFolder &&(
                    <div
                    role="button"
                    className="opacity-0 group-hover:opacity-100 h-full ml-2 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <DropdownMenu>
                        <DropdownMenuTrigger>
                        <Plus className="h-4 w-4 text-muted-foreground"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem onClick={onCreateFolder}>Folder</DropdownMenuItem>
                        <DropdownMenuItem onClick={onCreate}>Document</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    )}
                </div>
            )}
        </div>
    )
}


Item.Skeleton = function ItemSkeleton({ level }) {
    return (
        <div style={{
            paddingLeft: level ? `${(level*12)+25}px` : "12px"
        }} className="flex gap-x-2 py-[3px]">
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>

        </div>
    )
}