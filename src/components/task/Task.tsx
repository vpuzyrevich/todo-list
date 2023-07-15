import { Box, Checkbox, IconButton, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { deleteTask, updateTask } from 'store/tasksReducer';
import { ITask } from 'types/types';

export const Task: FC<{ task: ITask }> = ({task}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    getValues,
  } = useForm();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [isChecked, setIsChecked] = useState<boolean>();

  const onDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const onChangeTask = () => {
    const value = getValues('task');
    dispatch(updateTask({id: task.id, content: value}));
  };

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit(onChangeTask)}
      id={task.id}
      sx={{
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        mt: '20px',
        borderBottom: '2px dotted rgb(152, 181, 218)',
        height: 'content',
        }}
    >
      <Checkbox size='small' onChange={(e) => setIsChecked(e.target.checked)}/>
      {isEdit ?
        <TextField
          autoFocus
          defaultValue={task.content}
          size="small"
          multiline
          maxRows={4}
          {...register('task')}
          sx={{width: '85%', '&:focus': { outline: 'none' } }}
        /> 
      :
        <Typography
          sx={{ 
            width: '85%',
            textDecoration: `${isChecked ? 'line-through' : 'none'}`,
            color: `${isChecked ? '#aba8a8' : '#000000'}`,
            overflow: 'hidden',
            }}
        >
          {task.content}
        </Typography>
      }
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: {xs: '2px', sm: '5px'}, ml: '5px' }}>
        <IconButton type="submit" aria-label="edit" onClick={() => isEdit ? setIsEdit(false) : setIsEdit(true)} size='small'>
          <EditIcon fontSize='small' color='action'/>
        </IconButton>
        <IconButton size='small' aria-label="delete" onClick={() => onDeleteTask()}>
          <DeleteForeverIcon fontSize='small' color='error' />
        </IconButton>
      </Box>
    </Box>
  )
}