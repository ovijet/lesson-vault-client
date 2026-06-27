import React from 'react';

const AddLesson = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson`)
    const data = await res.json()

    console.log(data,'fffffffffffffxxxxxxxxxxxxxxxxxxx');
    return (
        <div>
            hffffffffffff
        </div>
    );
};

export default AddLesson;