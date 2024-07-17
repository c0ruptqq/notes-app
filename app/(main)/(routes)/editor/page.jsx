'use client'
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { toast, Toaster } from "sonner"
import { DocumentList } from "../../_componenets/document-list"


export default function Editor(){
    const {user} = useUser
    const create = useMutation(api.documents.create)
    const onCreate = () => {
        const promise = create({ title: "Untitled", folder: false})
        toast.promise(promise, {
            loading: "Creating a new note",
            success: "New note created",
            error: "Failed to create note"
        })
    }
    const onCreateFolder = () => {
        const promise = create({ title: "Folder", folder: true})
        toast.promise(promise, {
            loading: "Creating a new folder",
            success: "New folder created",
            error: "Failed to create folder"
        })
    }
    return(
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center">
                    <Toaster />
                    <Button className='mt-3' onClick={onCreate}>
                        New Note
                    </Button>
                    <Button className='mt-3' onClick={onCreateFolder}>
                        New Folder
                    </Button>
                    <div>
                        <DocumentList/>
                    </div>
                </div>
            </div>
    )
}