'use client'
import { Button } from '@/components/ui/button'
import { Heading } from './_components/heading'
import Link from 'next/link'

export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Heading />
        <Button className='mt-3'>
          
          <Link href="/editor">See Notes</Link>
          </Button>
      </div>
    </div>
  )
}
