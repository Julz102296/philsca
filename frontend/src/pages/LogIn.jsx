/** @format */

import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
  InputRightElement,
  InputGroup,
  Stack,
  FormHelperText,
  Select
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LogIn = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [errors, setErrors] = useState({});
  
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      signIn();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!role) {
      errors.role = "Role is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };

  const signIn = async () => {
    setIsSigningIn(true);

    const userToSignIn = allUser.find((user) => user.email === email);

    if (userToSignIn) {
      if (
        userToSignIn.password === password &&
        userToSignIn.role === role.toLowerCase()
      ) {
        try {
          setIsAuthenticated(true);
          toast({
            title: "Successfully Logged In",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          navigate("/dashboard");
        } catch (error) {
          console.error("Authentication error:", error);
          toast({
            title: "Error during authentication",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
        } finally {
          setIsSigningIn(false);
        }
      } else {
        toast({
          title: "Password does not match or check the role",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
        setIsSigningIn(false);
      }
    } else {
      toast({
        title: "User not Found",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        };

        const response = await axios.get(`${globalUrl}/accounts/retrieveAll`, {
          headers: header,
        });

        setAllUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="fixed flex justify-center items-center text-center h-[100vh] w-screen z-40 bg-white dark:bg-black">
        <ThreeDots
          height={200}
          width={200}
          color="#4fa94d"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  return (
    <Box height="100vh" position="relative" bg="purple.400">
      <Text
        fontSize="4xl"
        fontWeight="bold"
        position="absolute"
        top="20px"
        left="20px"
        color="purple.200"
      >
        Philsca
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="white"
        p="30px"
        rounded="20px"
        width="350px"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        shadow="2xl"
      >
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="purple.500">
          Login
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.role}>
              <Select
                name="role"
                placeholder="Select role"
                onChange={handleChange}
                value={role}
              >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </Select>
              {errors.role && (
                <FormHelperText color="red.500">{errors.role}</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.email}>
              <FormLabel color="purple.500">Email</FormLabel>
              <Input
                type="text"
                name="email"
                placeholder="admincocomartin@gmail.com"
                onChange={handleChange}
                value={email}
              />
              {errors.email ? (
                <FormHelperText color="red.500">{errors.email}</FormHelperText>
              ) : (
                <FormHelperText>Input a valid email</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.password}>
              <FormLabel color="purple.500">Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={password}
                />
                <InputRightElement w="4.5rem">
                  <Box
                    onClick={handleShowPassword}
                    _hover={{ cursor: "pointer", color: "#3182CE" }}
                    fontSize="2xl"
                    mb={2}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Box>
                </InputRightElement>
              </InputGroup>
              {errors.password ? (
                <FormHelperText color="red.500">
                  {errors.password}
                </FormHelperText>
              ) : (
                <FormHelperText>
                  Use 8 characters or more for your password
                </FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <Button
                width="100%"
                bg="purple.400"
                textColor="white"
                mt="30px"
                isLoading={isSigningIn}
                type="submit"
              >
                Login
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LogIn;
