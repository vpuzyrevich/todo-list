import { Box, IconButton, InputBase } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import AddIcon from '@mui/icons-material/Add';
import { addTask } from 'store/tasksReducer';
import { ITask } from 'types/types';
import uniqid from 'uniqid';

export const FormCreateTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm();

  const onCreateTask = () => {
    const value = getValues('inputCreateTask');
    const task: ITask = {
      id: uniqid(),
      content: value,
    }
    value && dispatch(addTask(task));
    setValue('inputCreateTask', '');
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onCreateTask)}
      sx={{ mt: 2, width: '100%', border: '2px solid rgb(152, 181, 218)'}}
    >
      <IconButton 
        type="submit"
        sx={{
          width: {xs: 50, sm: 50, md: 70, lg: 70, xl: 70},
          backgroundColor: 'rgb(152, 181, 218)',
          borderRadius: 0,
          '&:hover': { backgroundColor: 'rgb(137, 167, 206)' }
        }}
      >
        <AddIcon/>
      </IconButton>
      <InputBase
        autoComplete='off'
        sx={{pl: '15px', width: {xs: '75%', sm: '85%'}, border: 'none', fontSize: 16}}
        size='small'
        placeholder="Add your todo..."
        {...register("inputCreateTask")}
      />
    </Box>
  )
}