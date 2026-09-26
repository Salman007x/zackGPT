const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
        console.log('No user found in request object');
    }
    res.status(200).json({ user });
    console.log('User fetched successfully:', user);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching user', error: error.message });
  }
};

export default getCurrentUser;
