import LogoutButton from './authButton';
import UserInfo from './userInfo';
import {
    Card
  } from "@/components/ui/card"

export default function UserBox(){

    return(
        <>
        <Card className=" h-24 flex flex-col items-center p-3">
            <UserInfo />
            <LogoutButton />
        </Card>
        </>
    )
}