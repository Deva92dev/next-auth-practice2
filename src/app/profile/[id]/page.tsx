const UserProfile = ({ params }: any) => {
  return (
    <div className='flex flex-col p-2 m-2 justify-center items-center min-h-screen'>
      <h1 className='text-3xl font-bold'>Profile</h1>
      <hr />
      <p className='text-4xl font-bold'>
        Profile Page
        <span className='p-2 ml-2 rounded-lg bg-indigo-500'>{params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
