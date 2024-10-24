

import { MenuProps } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import userProfilePic from "../../public/assets/images/p5.jpg"; 
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
        <div>
            <Dropdown menu={{ items }} placement="bottomRight" arrow> 
                <Image
                    src={userProfilePic}
                    alt="Profile"           
                    className="rounded-full h-10 w-10 cursor-pointer"
                />    
            </Dropdown>
        </div>
    );
};

export default NavbarDropdown;
