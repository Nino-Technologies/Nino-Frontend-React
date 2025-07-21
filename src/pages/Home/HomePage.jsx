import React, { useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./HomePage.css";
import Nav, { DashboardSideNav } from "../../components/Nav/Nav.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { useCookies } from "react-cookie";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  Paper,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  Work,
  Assignment,
  CheckCircle,
  Schedule,
  Notifications,
  Star,
  Visibility,
  Message,
  Add,
  MoreVert,
  ArrowForward,
  Person,
  Business,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function Dashboard() {
  const { loggedIn, getUserProfile, userProfile } = useContext(UserContext);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies();

  // Mock data for the new dashboard
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalJobs: 156,
      completedJobs: 89,
      activeJobs: 23,
      totalEarnings: 45250,
      monthlyGrowth: 12.5,
      responseRate: 94.2,
      averageRating: 4.8,
      pendingBids: 7
    },
    recentActivity: [
      {
        id: 1,
        type: 'job_completed',
        title: 'Kitchen Renovation',
        description: 'Job completed successfully',
        amount: 2500,
        date: '2024-01-15',
        status: 'completed',
        artisan: 'John Smith'
      },
      {
        id: 2,
        type: 'new_bid',
        title: 'Electrical Installation',
        description: 'New bid received',
        amount: 1800,
        date: '2024-01-14',
        status: 'pending',
        artisan: 'Mike Johnson'
      },
      {
        id: 3,
        type: 'payment_received',
        title: 'Plumbing Repair',
        description: 'Payment received',
        amount: 950,
        date: '2024-01-13',
        status: 'completed',
        artisan: 'Sarah Wilson'
      }
    ],
    performanceData: [
      { month: 'Jan', jobs: 12, earnings: 8500 },
      { month: 'Feb', jobs: 15, earnings: 12000 },
      { month: 'Mar', jobs: 18, earnings: 14500 },
      { month: 'Apr', jobs: 22, earnings: 18000 },
      { month: 'May', jobs: 25, earnings: 22000 },
      { month: 'Jun', jobs: 28, earnings: 25000 }
    ],
    categoryDistribution: [
      { name: 'Construction', value: 35, color: '#8884d8' },
      { name: 'Electrical', value: 25, color: '#82ca9d' },
      { name: 'Plumbing', value: 20, color: '#ffc658' },
      { name: 'Cleaning', value: 15, color: '#ff7300' },
      { name: 'Others', value: 5, color: '#8dd1e1' }
    ]
  });

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login?as=user");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      getUserProfile();
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      default: return 'default';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'job_completed': return <CheckCircle />;
      case 'new_bid': return <Assignment />;
      case 'payment_received': return <AccountBalanceWallet />;
      default: return <Notifications />;
    }
  };

  return (
    <div className="Dashboard">
      <input
        type="checkbox"
        className="sideBarCheck"
        checked={sideNavOpen ? true : false}
        style={{ display: "none" }}
        onChange={() => null}
      />
      {/* <div className="dashboardNav">
        <Nav />
      </div> */}
      <div className="page-body-wrapper">
        {/* <div className="side-nav">
          <DashboardSideNav
            sideNavOpen={sideNavOpen}
            setSideNavOpen={setSideNavOpen}
          />
        </div> */}
        <div className="w-100" >
          <Box sx={{ p: 3 }}>
            {/* Welcome Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#013049', mb: 1 }}>
                Welcome back, {userProfile?.fullName || 'User'}! 👋
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here's what's happening with your account today
              </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  height: '100%'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {dashboardData.stats.totalJobs}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Total Jobs
                        </Typography>
                      </Box>
                      <Work sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="caption">
                        +{dashboardData.stats.monthlyGrowth}% this month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  height: '100%'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          ₦{dashboardData.stats.totalEarnings.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Total Earnings
                        </Typography>
                      </Box>
                      <AccountBalanceWallet sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="caption">
                        +8.2% vs last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  height: '100%'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {dashboardData.stats.activeJobs}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Active Jobs
                        </Typography>
                      </Box>
                      <Schedule sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="caption">
                        {dashboardData.stats.pendingBids} pending bids
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: 'white',
                  height: '100%'
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {dashboardData.stats.averageRating}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Avg Rating
                        </Typography>
                      </Box>
                      <Star sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="caption">
                        {dashboardData.stats.responseRate}% response rate
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Charts and Analytics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} lg={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Performance Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dashboardData.performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="jobs" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Job Categories
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={dashboardData.categoryDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {dashboardData.categoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Recent Activity and Quick Actions */}
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Recent Activity
                      </Typography>
                      <Button size="small" endIcon={<ArrowForward />}>
                        View All
                      </Button>
                    </Box>
                    <List>
                      {dashboardData.recentActivity.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: getStatusColor(activity.status) + '.main' }}>
                                {getActivityIcon(activity.type)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {activity.title}
                                  </Typography>
                                  <Chip 
                                    label={activity.status} 
                                    color={getStatusColor(activity.status)}
                                    size="small"
                                  />
                                </Box>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography component="span" variant="body2" color="text.primary">
                                    {activity.description} • {activity.artisan}
                                  </Typography>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="caption" color="text.secondary">
                                      ₦{activity.amount.toLocaleString()}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {new Date(activity.date).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          {index < dashboardData.recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Stack spacing={3}>
                  {/* Quick Actions */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Quick Actions
                      </Typography>
                      <Stack spacing={2}>
                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          fullWidth
                          sx={{ 
                            background: 'linear-gradient(135deg, #EF6E0B 0%, #d65c0a 100%)',
                            '&:hover': { background: 'linear-gradient(135deg, #d65c0a 0%, #c04a09 100%)' }
                          }}
                          onClick={() => navigate('/dashboard/create-offer')}
                        >
                          Create New Job
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Work />}
                          fullWidth
                          onClick={() => navigate('/dashboard/job-record')}
                        >
                          View My Jobs
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<AccountBalanceWallet />}
                          fullWidth
                          onClick={() => navigate('/dashboard/wallet')}
                        >
                          Check Wallet
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Profile Summary */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Profile Summary
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                          {userProfile?.fullName?.charAt(0) || 'U'}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {userProfile?.fullName || 'User Name'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {userProfile?.role === 0 ? 'Client' : userProfile?.role === 1 ? 'Artisan' : 'Admin'}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {userProfile?.officeLocation || 'Location not set'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {userProfile?.phoneNumber || 'Phone not set'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {userProfile?.email || 'Email not set'}
                          </Typography>
                        </Box>
                      </Stack>

                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/dashboard/profile')}
                      >
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
