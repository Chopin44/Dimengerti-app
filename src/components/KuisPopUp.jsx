// TutorialPopup.jsx
import React from 'react';
import Swal from 'sweetalert2';

const KuisPopUp = ({ onStartKuis }) => {
  const closeTutorial = () => {
    Swal.fire({
      title: 'Welcome to the Kuis Tutorial',
      html: 'This is a brief tutorial on how to take the quiz. Click "Start Quiz" to begin!',
      icon: 'info',
      confirmButtonText: 'Start Quiz',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        onStartKuis(); // Call the provided onStartKuis function
      }
    });
  };

  return <>{closeTutorial()}</>;
};

export default KuisPopUp;
