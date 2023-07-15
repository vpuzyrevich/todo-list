import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Task } from '../task/Task';
import { FormCreateTask } from 'components/formCreateTask/FormCreateTask';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const App = () => {
  const { tasks } = useSelector((state: RootState) => state.task);
  return (
    <Box sx={{width: '100%', minHeight: '100vh', backgroundColor: 'rgb(236, 235, 235)'}}>
      <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Box sx={{ p: 2, m: 10, width: {xs: 250, sm: 500, md: 500, lg: 600, xl: 600}, minWidth: 250, minHeight: 150, borderRadius: 3, backgroundColor: '#fff' }}>
          <Typography sx={{fontSize: 26, color: '#595656'}}>Todo List</Typography>
          <FormCreateTask/>
          <Box>
            {tasks.map((task) => <Task key={task.id} task={task}/>)}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
