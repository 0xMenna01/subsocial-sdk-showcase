import { Avatar, Flex, Box, Text, useClipboard } from '@chakra-ui/react'
import styles from '../../../styles/NewProfile.module.css'
import Image, { StaticImageData } from 'next/image'
import { CheckIcon, CopyIcon } from '@chakra-ui/icons'
import { IconCustomButton } from '../../button/IconCustomButton'

type AccountInfoProps = {
   avatar: StaticImageData
   address: string
   name?: string
}

export const AccountInfo = ({ address, avatar, name }: AccountInfoProps) => {
   const { onCopy, hasCopied } = useClipboard(address)

   return (
      <Flex className={styles.accountinfo}>
         <Avatar size="lg">
            <Image src={avatar} alt="avatar" />
         </Avatar>

         <Box className={styles.addressaccount} background="second">
            <Text color="white" opacity="0.8" fontWeight="800">
               {name}
            </Text>
            <IconCustomButton
               text={hasCopied ? 'Address copied!' : 'Copy address'}
               bg="back"
               onClick={onCopy}
            >
               {hasCopied ? <CheckIcon /> : <CopyIcon />}
            </IconCustomButton>
         </Box>
      </Flex>
   )
}
