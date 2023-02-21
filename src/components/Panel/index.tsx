import { useState } from "react";
import { Box, ChevronDownIcon, ChevronUpIcon, Heading, HStack, Pressable } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";

interface PanelProps extends InterfaceBoxProps {
    title: string
    children: JSX.Element
}

export function Panel({
    title,
    children,
    ...rest
}: PanelProps){
    const [ isShow, setIsShow ] = useState(false)

    return (
        <Box bg={'gray.800'} p={5} borderRadius={8} {...rest}>
            <Pressable onPress={() => setIsShow(!isShow)}>
                <HStack pb={isShow ? 5 : 0} justifyContent={'space-between'} alignItems={'center'}>
                    <Heading size={'sm'} color={'gray.400'}>{title}</Heading>
                    {isShow ? <ChevronUpIcon color={'emerald.500'}/> : <ChevronDownIcon color={'emerald.500'}/>}
                </HStack>
            </Pressable>

            {isShow && children}
        </Box>
    )
}