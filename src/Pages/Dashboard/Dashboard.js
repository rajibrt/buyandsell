import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="bg-base-200">
            <div>
                <div>
                    <h2 className="text-3xl font-bold">Hi, {user.displayName}</h2>
                    <p className='text-xl'> Welcome back to Dashboard</p>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;