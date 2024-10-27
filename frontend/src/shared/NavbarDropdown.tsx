/* eslint-disable @next/next/no-img-element */
import { MenuProps } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Dropdown = dynamic(() => import("antd/lib/dropdown"), { ssr: false });

const NavbarDropdown = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href="/profile">
                    Profile
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href="/deshboard">
                    Dashboard
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link href="/">
                    Logout
                </Link>
            ),
        },
    ];

    return (

        <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <img style={{width: '50px', height: '50px', borderRadius: '50%'}} 
            src="https://i.ibb.co.com/mGpJ6w7/user-Profile.jpg" alt='Profile' className='border-2 border-blue-600'/>
        </Dropdown>

    );
};

export default NavbarDropdown;
