// pages/users/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserById } from '../../lib/api';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const userData = await getUserById(id);
        setUser(userData);
      };
      fetchUser();
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Detail</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetail;
