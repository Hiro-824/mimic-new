"use client"

import { Background } from "@/components/background"
import { Header } from "@/components/header"
import { Box } from "@chakra-ui/react"
import { Footer } from "./footer"
import React, { ReactNode } from 'react'
import { User } from "@supabase/supabase-js"

type Props = {
    children: ReactNode
    user: User | null
}

export const BasicLayout = ({ children, user }: Props) => {
    return (
        <Box>
            <Background />
            <Header user={user} />
            <Box pt={240} px={4} maxW="1080px" mx="auto" minH={"100vh"}>
                {children}
            </Box>
            <Footer />
        </Box>
    )
}