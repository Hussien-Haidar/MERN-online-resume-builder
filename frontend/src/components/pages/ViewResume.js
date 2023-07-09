import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Template1 from '../templates/Template1';

const ViewResume = () => {
    const { id } = useParams()
    const { user } = useSelector(state => state.user);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch(`/api/resume/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${user.token}`
                    }
                })

                if (response.ok) {
                    const json = await response.json();
                    setResume(json);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError('Failed to fetch resume');
                }
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        }

        if (user) {
            fetchResume()
        }
    }, [id, user])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Template1 resume={resume} />
    )
}

export default ViewResume;