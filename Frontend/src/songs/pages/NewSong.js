// import React, { useContext } from "react";
// import Input from "../../shared/components/FormElements/Input";

// import {
//   VALIDATOR_REQUIRE,
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_URL,
// } from "../../shared/util/validators";
// import Button from "../../shared/components/UIElements/Button";
// import { useForm } from "../../shared/hooks/form-hook";
// import { AuthContext } from "../../shared/context/auth-context";



// const NewSong = () => {
//   const auth = useContext(AuthContext);

//   const [formState, changeHandler] = useForm(
//     {
//       title: {
//         value: "",
//         isValid: false,
//       },
//       artist: {
//         value: "",
//         isValid: false,
//       },
//       description: {
//         value: "",
//         isValid: false,
//       },
//       url: {
//         value: "",
//         isValid: false,
//       },
//     },
//     false
//   );

//   // send data to the server!
//   const submitHandler = async (event) => {
//     event.preventDefault();
//     console.log(auth.id);

//     const response = await fetch("http://localhost:5000/api/songs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: formState.inputs.title.value,
//         artist: formState.inputs.artist.value,
//         description: formState.inputs.description.value,
//         url: formState.inputs.url.value,
//         creator: auth.id,
//       }),
//     });

//     const responseData = await response.json();
//     if (!response.ok) {
//       throw new Error(responseData.message);
//     }
//     console.log(responseData);

//     // check if json is ok
//     console.log(formState.inputs);
//   };

//   return (
//     <form className="song-form" onSubmit={submitHandler}>
//       <Input
//         id="title"
//         element="input"
//         type="text"
//         label="Title"
//         validators={[VALIDATOR_REQUIRE()]}
//         errorText="Please enter a valid title!"
//         onInput={changeHandler}
//       />
//       <Input
//         id="artist"
//         element="input"
//         type="text"
//         label="Artist"
//         validators={[VALIDATOR_REQUIRE()]}
//         errorText="Please enter a valid artist!"
//         onInput={changeHandler}
//       />
//       <Input
//         id="description"
//         element="textarea"
//         label="Description"
//         validators={[VALIDATOR_MINLENGTH(3)]}
//         errorText="Please enter a valid description!"
//         onInput={changeHandler}
//       />
//       <Input
//         id="url"
//         element="input"
//         label="Song URL"
//         validators={[VALIDATOR_URL()]}
//         errorText="Please enter a valid URL! Only links from Spotify, Soundcloud and Youtube are accepted!!!!!!!!!!!!!!"
//         onInput={changeHandler}
//       />

//       <Button type="submit" disabled={!formState.isValid}>
//         ADD SONG
//       </Button>
//       <p>Is the form valid? {String(formState.isValid)}</p>
//     </form>
//   );
// };

// export default NewSong;
