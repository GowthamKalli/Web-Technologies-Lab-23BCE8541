let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

const getAllUsers = (req, res) => {
  res.json({ success: true, data: users });
};

const getUserById = (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  return res.json({ success: true, data: user });
};

const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required',
    });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
  };

  users.push(newUser);
  return res.status(201).json({ success: true, data: newUser });
};

const updateUser = (req, res) => {
  const userId = Number(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex((item) => item.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
  };

  return res.json({ success: true, data: users[userIndex] });
};

const deleteUser = (req, res) => {
  const userId = Number(req.params.id);
  const userExists = users.some((item) => item.id === userId);

  if (!userExists) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  users = users.filter((item) => item.id !== userId);
  return res.json({ success: true, message: 'User deleted successfully' });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
