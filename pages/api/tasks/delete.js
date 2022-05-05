// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks } from './_tasks'

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     // Process a POST request
//   } else {
//     // Handle any other HTTP method
//   }
// }
console.log(tasks)


export default (req, res) => {
  

  res.status(200).json(tasks)
}


// import { people } from '../../../data'
// export default function personHandler({ query: { id } }, res) {
//   const filtered = people.filter((p) => p.id === id)

//   // User with id exists
//   if (filtered.length > 0) {
//     res.status(200).json(filtered[0])
//   } else {
//     res.status(404).json({ message: `User with id: ${id} not found.` })
//   }
// }


// import { useRouter } from 'next/router'
// import useSWR from 'swr'

// const fetcher = async (url) => {
//   const res = await fetch(url)
//   const data = await res.json()

//   if (res.status !== 200) {
//     throw new Error(data.message)
//   }
//   return data
// }

// export default function Person() {
//   const { query } = useRouter()
//   const { data, error } = useSWR(
//     () => query.id && `/api/people/${query.id}`,
//     fetcher
//   )

//   if (error) return <div>{error.message}</div>
//   if (!data) return <div>Loading...</div>

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Height</th>
//           <th>Mass</th>
//           <th>Hair color</th>
//           <th>Skin color</th>
//           <th>Eye color</th>
//           <th>Gender</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>{data.name}</td>
//           <td>{data.height}</td>
//           <td>{data.mass}</td>
//           <td>{data.hair_color}</td>
//           <td>{data.skin_color}</td>
//           <td>{data.eye_color}</td>
//           <td>{data.gender}</td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }



// export default function userHandler(req, res) {
//   const {
//     query: { id, name },
//     method,
//   } = req

//   switch (method) {
//     case 'GET':
//       // Get data from your database
//       res.status(200).json({ id, name: `User ${id}` })
//       break
//     case 'PUT':
//       // Update or create data in your database
//       res.status(200).json({ id, name: name || `User ${id}` })
//       break
//     default:
//       res.setHeader('Allow', ['GET', 'PUT'])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }