import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import './index.css';

const CreditScore = ({ onSignOut }) => {

  const paymentHistory = [
    { receiver: 'Tesco Market', type: 'Shopping', date: '2023-05-15', amount: 50 },
    { receiver: 'John Doe', type: 'Food', date: '2023-05-12', amount: 30 },
    { receiver: 'Ann Marie', type: 'Bills', date: '2023-05-10', amount: 25 },
    { receiver: 'Fiorgio Restaurant', type: 'Dining', date: '2023-05-08', amount: 70 },
    { receiver: 'XYZ Company', type: 'Services', date: '2023-05-05', amount: 40 },
  ];

  const pieChartData = [
    { value: 3, color: '#24aa4a' },
    { value: 2, color: '#bb4430' },
    { value: 5, color: '#197bbd' },
  ];

  const cardData = [
    {
      title: 'Renovation',
      amount: '$500',
      date: '01/15/22',
      icon: '🔨',
    },
    {
      title: 'Vacation',
      amount: '$720',
      date: '02/20/22',
      icon: '✈️',
    },
    {
      title: 'Xbox',
      amount: '$200',
      date: '03/10/22',
      icon: '🎮',
    },
  ];

  const invoiceData = [
    { status: 'Late', percentage: 30 },
    { status: 'Paid', percentage: 45 },
    { status: 'Unpaid', percentage: 25 },
  ];
  
  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <>
    {/* <div className="credit-header-container">
        <div>
        <h2 className="credit-title">Credit Score</h2>
        </div>
        <div>
        <Button variant="contained" onClick={handleSignOut}>
          Sign Out
        </Button>
        </div>
       </div> */}
    <section className="credit-container">
      <div className='credit-inner-main'>
        <div className='score-container'>
          <div className="score-inner" >
            <PieChart
            sx={{padding:"10px"}}
              series={[
                {
                  data: pieChartData,
                  innerRadius: 75,
                  outerRadius: 100,
                  paddingAngle: 0,
                  cornerRadius: 10,
                  startAngle: 0,
                  endAngle: 360,
                }
              ]}
            />
            <div className='scoreHeadingText'>
              <Typography variant="h4" color="inherit">
                675
              </Typography>
              <Typography variant="body2" color="inherit">
                Score
              </Typography>
            </div>
            </div>
          <div className='scoreTitles'>
          <div style={{ fontSize: '30px', color:"#197bbd" }}>
                $ 2850.75
              </div>
              <div style={{ fontSize: '17px' }}>
                Total Paid 
              </div>
              <div style={{ fontSize: '28px',color:"#24aa4a" }}>
              $ 1500.50
              </div>
              <div style={{ fontSize: '17px' }}>
                 Unpaid 
              </div>
              <div style={{ fontSize: '25px',color:"#bb4430" }}>
              $ 350.60
              </div>
              <div style={{ fontSize: '17px' }}>
                Late 
              </div>
          </div>
        </div>
        <div className="payment-history-container">
          <h2  className="credit-title">Payment History</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Receiver</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentHistory.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{fontSize: "0.9rem",fontWeight:"600"}}>{transaction.receiver}</TableCell>
                    <TableCell sx={{color:"#C7C7C7"}}>{transaction.type}</TableCell>
                    <TableCell sx={{color:"#C7C7C7"}}>{transaction.date}</TableCell>
                    <TableCell sx={{fontSize: "0.9rem",fontWeight:"600"}}>${transaction.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className='credit-inner-main'>
        <div className='invoices-container'>
          <h2  className="credit-title">Invoices</h2>
          <div className='invoiceCardContainer'>
            {cardData.map((data, index) => (
              <Card key={index} style={{StextAlign:"center" }}>
                
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    {data.amount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {data.date}
                  </Typography>
                </CardContent>
                <CardHeader
                  avatar={<Avatar aria-label="icon">{data.icon}</Avatar>}
                  title={data.title}
                />
              </Card>
            ))}
          </div>
        </div>
        <div className="invoice-status-container">
          <h2  className="credit-title">Invoice Status</h2>
          <div style={{ marginTop: 20 }}>
  {invoiceData.map((data, index) => (
    <Box key={index} sx={{ textAlign: 'start', marginBottom: 2 }}>
      <Typography variant="h6">
        {data.status}
      </Typography>
      <div className='progressContainer'>
      <LinearProgress
        variant="determinate"
        value={data.percentage}
        sx={{
          height:"10px",
          borderRadius:"13px",
          width:"70%",
          backgroundColor: 'rgba(241, 241, 241, 1)', 
          '& .MuiLinearProgress-bar': {
            backgroundColor: data.status === 'Late' ? '#bb4430' : data.status === 'Paid' ? '#24aa4a' : '#197bbd',
          },
        }}
      />
      <Typography variant="body1" color="textSecondary" className="InvoiceStatusText">
        {`${data.percentage}%`}
      </Typography>
      </div>
    </Box>
  ))}
</div>
        </div>
      </div>
    </section>
    </>
  );
};

export default CreditScore;
