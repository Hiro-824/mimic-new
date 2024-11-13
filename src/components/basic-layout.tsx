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
    hasFooter?: boolean
}

export const BasicLayout = ({ children, user, hasFooter = true }: Props) => {
    return (
        <Box>
            <Background />
            <Header user={user} />
            <Box px={4} maxW="1080px" mx="auto" minH={"100vh"}>
                {children}
            </Box>
            {hasFooter && <Footer />}
        </Box>
    )
}