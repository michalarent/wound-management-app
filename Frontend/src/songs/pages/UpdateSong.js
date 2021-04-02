// import React, { useEffect, useState } from 'react';
// import { useParams} from 'react-router-dom';

// import Input from '../../shared/components/FormElements/Input';
// import Button from '../../shared/components/UIElements/Button';
// import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

// import './NewSong.css';
// import { useForm } from '../../shared/hooks/form-hook';

// const DUMMY_SONGS = [
//     {
//         id: 's1',
//         title: 'Jebać PiS',
//         description: 'One of the most important songs of 2020 and 2021',
//         image: 'https://i.ytimg.com/vi/FQq6Mwv_jpw/maxresdefault.jpg',
//         length: '3500',
//         creator: 'u1'
        
//     },
//     {
//         id: 's2',
//         title: 'Jebać SąD',
//         description: 'One of the most important songs of 2020 and 2021',
//         image: 'https://pbs.twimg.com/media/EbXlmjgWsAEy0Ph.png',
//         length: '3500',
//         creator: 'u2'
        
//     },
// ]

// const UpdateSong = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const songId = useParams().songId;
  
//     const [formState, changeHandler, setFormData] = useForm(
//       {
//         title: {
//           value: '',
//           isValid: false
//         },
//         description: {
//           value: '',
//           isValid: false
//         }
//       },
//       false
//     );
  
//     const identifiedSong = DUMMY_SONGS.find(p => p.id === songId);
  
//     useEffect(() => {
//         if (identifiedSong) {
//             setFormData(
//                 {
//                 title: {
//                     value: identifiedSong.title,
//                     isValid: true
//                 },
//                 description: {
//                     value: identifiedSong.description,
//                     isValid: true
//                 }
//                 },
//                 true
//             );
//          }
//             setIsLoading(false);
//             }, [setFormData, identifiedSong]);
        
//             const songSubmitHandler = event => {
//             event.preventDefault();
//             console.log(formState.inputs);
            
//         };
  
//     if (!identifiedSong) {
//       return (
//         <div className="center">
//           <h2>Could not find place!</h2>
//         </div>
//       );
//     }
  
//     if (isLoading) {
//       return (
//         <div className="center">
//           <h2>Loading...</h2>
//         </div>
//       );
//     }
  
//     return (
//       <form className="song-form" onSubmit={songSubmitHandler}>
//         <Input
//           id="title"
//           element="input"
//           type="text"
//           label="Title"
//           validators={[VALIDATOR_REQUIRE()]}
//           errorText="Please enter a valid title."
//           onInput={changeHandler}
//           initialValue={formState.inputs.title.value}
//           initialValid={formState.inputs.title.isValid}
//         />
//         <Input
//           id="description"
//           element="textarea"
//           label="Description"
//           validators={[VALIDATOR_MINLENGTH(5)]}
//           errorText="Please enter a valid description (min. 5 characters)."
//           onInput={changeHandler}
//           initialValue={formState.inputs.description.value}
//           initialValid={formState.inputs.description.isValid}
//         />
//         <Button type="submit" disabled={!formState.isValid}>
//           UPDATE PLACE
//         </Button>
//       </form>
//     );
//   };
  
//   export default UpdateSong;

