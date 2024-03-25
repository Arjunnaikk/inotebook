import React, { useEffect, useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext'

function Profile() {
    const context = useContext(noteContext)
    const { notes, getNotes } = context
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/getuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-header': localStorage.getItem('token'),
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    getNotes()
                    console.log(user);

                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchUserData();
        // eslint-disable-next-line
    }, []);

    // Render loading indicator if data is being fetched
    if (loading) {
        return <p>Loading...</p>;
    }

    // Conditionally render based on whether user data is available
    return user ? (
        <div className="container">
            <div className="card bg-warning d-flex" style={{ width: '70rem', justifyContent: "center" }}>
                <div className='' style={{ width: '15rem' }}><img src="/proact.png" className="card-img-top" alt="..." /></div>
                <div className="card-body">
                    <h5 className="card-title"><div className="d-flex" style={{ alignItems: "center" }}><h2 style={{ marginRight: "10px", fontWeight: "900" }}>Name:</h2> <h2>{user.name}</h2></div></h5>
                    <h5 className="card-title"><div className="d-flex" style={{ alignItems: "center" }}><h2 style={{ marginRight: "10px", fontWeight: "900" }}>Email:</h2> <h2>{user.email}</h2></div></h5>
                    <h5 className="card-title"><div className="d-flex" style={{ alignItems: "center" }}><h2 style={{ marginRight: "10px", fontWeight: "900" }}>Total Notes:</h2> <h2>{notes.length}</h2></div></h5>
                    <p className="card-text"></p>
                </div>
            </div>
        </div>
    ) : (
        <p>No user data available.</p>
    );
}

export default Profile;
