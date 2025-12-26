import type { PageProps, Metadata } from '../../../../src/types';

export const metadata: Metadata = {
  title: 'Users Management',
  description: 'Manage your application users',
};

export default function UsersPage({ searchParams }: PageProps) {
  const users = [
    { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com', role: 'Admin', status: 'active', avatar: '👨‍💼', joined: '2024-01-15' },
    { id: 2, name: 'สมหญิง รักเรียน', email: 'somying@example.com', role: 'Editor', status: 'active', avatar: '👩‍💻', joined: '2024-02-20' },
    { id: 3, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'active', avatar: '👨', joined: '2024-03-10' },
    { id: 4, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'inactive', avatar: '👩', joined: '2024-03-15' },
    { id: 5, name: 'วิชัย เก่งมาก', email: 'wichai@example.com', role: 'User', status: 'active', avatar: '👨‍🎓', joined: '2024-04-01' },
    { id: 6, name: 'มาลี สวยงาม', email: 'malee@example.com', role: 'User', status: 'pending', avatar: '👩‍🎨', joined: '2024-04-20' },
    { id: 7, name: 'Robert Brown', email: 'robert@example.com', role: 'Admin', status: 'active', avatar: '👨‍💻', joined: '2024-05-05' },
    { id: 8, name: 'อนันต์ มั่งมี', email: 'anan@example.com', role: 'User', status: 'active', avatar: '🧑‍💼', joined: '2024-05-15' },
  ];

  const stats = [
    { label: 'Total Users', value: 1234, icon: '👥' },
    { label: 'Active', value: 1089, icon: '✅' },
    { label: 'Inactive', value: 98, icon: '⏸️' },
    { label: 'Pending', value: 47, icon: '⏳' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'inactive': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#666';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': return 'background: #7c3aed; color: white;';
      case 'Editor': return 'background: #0ea5e9; color: white;';
      default: return 'background: #e5e7eb; color: #374151;';
    }
  };

  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 style="font-size: 2rem; margin-bottom: 0.25rem;">Users Management</h1>
          <p style="color: #666;">จัดการผู้ใช้งาน</p>
        </div>
        <button style="
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        ">+ Add User</button>
      </div>

      <!-- Stats -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
        ${stats.map(s => `
          <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 2rem;">${s.icon}</div>
            <div>
              <div style="font-size: 1.75rem; font-weight: bold;">${s.value.toLocaleString()}</div>
              <div style="color: #666; font-size: 0.9rem;">${s.label}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Search and Filter -->
      <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
        <input type="text" placeholder="Search users... / ค้นหาผู้ใช้..." style="
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        ">
        <select style="padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px;">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>User</option>
        </select>
        <select style="padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px;">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>
      </div>

      <!-- Users Table -->
      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
              <th style="text-align: left; padding: 1rem; font-weight: 500; color: #6b7280;">User</th>
              <th style="text-align: left; padding: 1rem; font-weight: 500; color: #6b7280;">Email</th>
              <th style="text-align: center; padding: 1rem; font-weight: 500; color: #6b7280;">Role</th>
              <th style="text-align: center; padding: 1rem; font-weight: 500; color: #6b7280;">Status</th>
              <th style="text-align: center; padding: 1rem; font-weight: 500; color: #6b7280;">Joined</th>
              <th style="text-align: center; padding: 1rem; font-weight: 500; color: #6b7280;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(user => `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 1rem;">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="font-size: 1.5rem;">${user.avatar}</div>
                    <div style="font-weight: 500;">${user.name}</div>
                  </div>
                </td>
                <td style="padding: 1rem; color: #6b7280;">${user.email}</td>
                <td style="padding: 1rem; text-align: center;">
                  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.85rem; ${getRoleBadge(user.role)}">${user.role}</span>
                </td>
                <td style="padding: 1rem; text-align: center;">
                  <span style="display: inline-flex; align-items: center; gap: 0.25rem;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${getStatusColor(user.status)};"></span>
                    <span style="color: ${getStatusColor(user.status)}; text-transform: capitalize;">${user.status}</span>
                  </span>
                </td>
                <td style="padding: 1rem; text-align: center; color: #6b7280;">${user.joined}</td>
                <td style="padding: 1rem; text-align: center;">
                  <div style="display: flex; gap: 0.5rem; justify-content: center;">
                    <button style="padding: 0.5rem; border: none; background: #f3f4f6; border-radius: 6px; cursor: pointer;">✏️</button>
                    <button style="padding: 0.5rem; border: none; background: #fee2e2; border-radius: 6px; cursor: pointer;">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Pagination -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-top: 1px solid #e5e7eb;">
          <div style="color: #6b7280;">Showing 1-8 of 1,234 users</div>
          <div style="display: flex; gap: 0.5rem;">
            <button style="padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 6px; background: white;">← Prev</button>
            <button style="padding: 0.5rem 1rem; border: none; border-radius: 6px; background: #ff6b35; color: white;">1</button>
            <button style="padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 6px; background: white;">2</button>
            <button style="padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 6px; background: white;">3</button>
            <button style="padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 6px; background: white;">Next →</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
