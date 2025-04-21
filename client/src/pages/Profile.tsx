// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';

// import { QUERY_USER, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';

// const Profile = () => {
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });

//   const user = data?.me || data?.user || {};
  
//   // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
//     return <Navigate to="/me" />;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

//   return (
//     <div>
//       <div className="flex-row justify-center mb-3">
//         <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
//           Viewing {userParam ? `${user.username}'s` : 'your'} profile.
//         </h2>

//         <div className="col-12 col-md-10 mb-5">
//           <ThoughtList
//             thoughts={user.thoughts}
//             title={`${user.username}'s thoughts...`}
//           />
//         </div>
//         {!userParam && (
//           <div
//             className="col-12 col-md-10 mb-3 p-3"
//             style={{ border: '1px dotted #1a1a1a' }}
//           >
//             <ThoughtForm />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;




import React, { useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList, { Thought as ThoughtType } from '../components/ThoughtList'; // Import the correct Thought type

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

// Define types for recipe data
interface Recipe {
  _id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[] | string;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    username: string;
  };
}

// Define type for user data
interface UserData {
  _id: string;
  username: string;
  email: string;
  thoughts?: ThoughtType[]; // Use the imported Thought type
  recipes?: Recipe[];
}

// Default images by category
const defaultImages: Record<string, string> = {
  Breakfast: '...',
  Lunch: '...',
  Dinner: '...',
  Dessert: '...',
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'thoughts' | 'recipes'>('thoughts');
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user: UserData = data?.me || data?.user || {};

  // ... rest of your Profile component ...

  return (
    // ... your JSX ...
    {activeTab === 'thoughts' ? (
      <div className="col-12 col-md-10 mb-5">
        {user.thoughts && (
          <ThoughtList
            thoughts={user.thoughts} // Now should be of type Thought from ThoughtList
            title={`${user.username}'s thoughts...`}
          />
        )}
        {!user.thoughts && <p className="text-gray-500">No thoughts yet.</p>}
      </div>
    ) : (
      // ... recipe section ...
    )}
    // ... more JSX ...
  );
};

export default Profile;
