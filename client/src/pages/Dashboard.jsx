import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComp from '../components/SidebarComp';
import ProfileComp from '../components/ProfileComp';


export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            {/* Sidebar */}
            <div className='md:w-56'>
                <SidebarComp />
            </div>

            {/* Content */}
            {tab === 'profile' && <ProfileComp />}
        </div>
    )
}
