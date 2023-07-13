import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const url = "https://image.tmdb.org/t/p/w500";

function MovieImageList({itemData}) {
  return (
    <ImageList  cols={3} rowHeight={164}>
      {itemData.map((item,index) => (
        <ImageListItem key={index}>
          <img
            src={`${url}${item.file_path}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${url}${item.file_path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={""}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default MovieImageList;