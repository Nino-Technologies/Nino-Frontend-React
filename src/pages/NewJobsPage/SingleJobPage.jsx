import React from 'react'
import Nav from '../../components/Nav/Nav'
import { Grid, Paper } from '@mui/material'

const SingleJobPage = () => {
  return (
    <div className='w-100'>
      <Nav />

      <div className="container">
        <Grid container className='mt-5 pt-5 w-100' sx={{ width: '100%' }} spacing={3}>
          {/* Main Content - Larger Column */}
          <Grid item xs={12} md={8}>
            <Paper className='w-100 p-4' elevation={2}>
              <div>
                <h3 className='fw-bold text-uppercase text-primarry'>
                  JOB TITLE
                </h3>
              </div>
              <hr />
              <div className='p-2 rounded-2 border border-1 border-secondary-subtle'>
                <h5 className='fw-bold'>
                  Description
                </h5>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur iusto natus, minus modi ea repellendus sit sapiente! Hic reiciendis beatae minima iusto, deleniti magni totam, possimus, ad veniam ab maxime.
                </p>
              </div>
            </Paper>
          </Grid>
          {/* Sidebar - Smaller Column */}
          <Grid item xs={12} md={4}>
            <Paper className='w-100 p-4' elevation={2}>
              Sidebar Content Here
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default SingleJobPage