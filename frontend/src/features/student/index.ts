import apiSlice from "../api/apiSlice";

const studentApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createStudent: builder.mutation({
            query: ({name, email, password}) => ({
                method: "POST",
                url: "/student/create",
                body: {
                    user: {
                         name,
                         email,
                         password,
                        
                    },
                    role: 'student',
                },
            })
        })
    })
})

export const {
useCreateStudentMutation
  } = studentApi;
  

