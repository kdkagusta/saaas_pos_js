import {
    Box,
    IconButton,
    Flex,
    Avatar,
    Menu,
    MenuList,
    MenuItem,
    MenuButton
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Header = ({ showSidebarButton = true, onShowSidebar, onLogout, user }) => {

    return (
        <Flex bg="red" p={2} color="white" justifyContent="end" minW="100%">
            <Box flex="1">
                {showSidebarButton && (
                    <IconButton
                        icon={<ChevronRightIcon w={8} h={8} />}
                        colorScheme="white"
                        variant="outline"
                        onClick={onShowSidebar}
                    />
                )}
            </Box>
            <Box>
                <Menu>
                    <MenuButton
                        _expanded={{ bg: "transparent" }}
                    >
                        <Avatar name={user?.name} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem color="blackAlpha.900">Toko : {user?.company_name}</MenuItem>
                        <MenuItem as={Link} to={`/users/${user?.id}/edit`} color="blackAlpha.900">{user?.name}</MenuItem>
                        <MenuItem color="blackAlpha.900" onClick={e => onLogout(e)}>logout</MenuItem>
                    </MenuList>
                </Menu>

            </Box>
        </Flex>
    )
}

export default Header
