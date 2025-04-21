// import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         createdAt
//       }
//     }
//   }
// `;

// export const QUERY_THOUGHTS = gql`
//   query getThoughts {
//     thoughts {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//     }
//   }
// `;

// export const QUERY_SINGLE_THOUGHT = gql`
//   query getSingleThought($thoughtId: ID!) {
//     thought(thoughtId: $thoughtId) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         thoughtAuthor
//         createdAt
//       }
//     }
//   }
// `;

// // Recipe queries
// export const QUERY_RECIPES = gql`
//   query GetRecipes($category: String, $search: String) {
//     getRecipes(category: $category, search: $search) {
//       _id
//       title
//       description
//       ingredients
//       instructions
//       category
//       createdAt
//       updatedAt
//       createdBy {
//         _id
//         username
//       }
//     }
//   }
// `;

// export const QUERY_RECIPE = gql`
//   query GetRecipeById($id: ID!) {
//     getRecipeById(id: $id) {
//       _id
//       title
//       description
//       ingredients
//       instructions
//       category
//       createdAt
//       updatedAt
//       createdBy {
//         _id
//         username
//       }
//     }
//   }
// `;


import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

// Recipe queries
export const QUERY_RECIPES = gql`
  query GetRecipes($category: String, $search: String) {
    getRecipes(category: $category, search: $search) {
      _id
      title
      description
      ingredients
      instructions
      category
      createdAt
      updatedAt
      createdBy {
        _id
        username
      }
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query GetRecipeById($id: ID!) {
    getRecipeById(id: $id) {
      _id
      title
      description
      ingredients
      instructions
      category
      createdAt
      updatedAt
      createdBy {
        _id
        username
      }
    }
  }
`;

