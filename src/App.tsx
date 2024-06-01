import { useEffect, useState } from "react";
import StarCards, { Star } from "./components/StarCards";
import StarForm, { formSchemaType } from "./components/StarForm";
import axios from "axios";
import { toast } from "./components/ui/use-toast";
// import PuffLoader from "react-spinners/PuffLoader";
import { CheckCheckIcon, XCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [stars, setStars] = useState<Star[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/stars")
      .then((response) => {
        console.log(response);
        setStars(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const triggerToast = (message: string, isSuccess: boolean = true) => {
    toast({
      title: message,
      description: (
        <div className="w-[340px] p-2 felx">
          {isSuccess ? (
            <div className="flex gap-4">
              <CheckCheckIcon />
              <p>Action completed!</p>
            </div>
          ) : (
            <div className="flex gap-4">
              <XCircleIcon /> <p>Action Filed!</p>
            </div>
          )}
        </div>
      ),
    });
  };

  const handleFormSubmit = (data: formSchemaType) => {
    const originalStars = [...stars];
    setLoading(true);
    axios
      .post("http://localhost:3000/stars", data)
      .then((response) => {
        const newStars = [response.data, ...stars];
        setStars(newStars);
        setLoading(false);

        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      })
      .catch((err) => {
        setStars(originalStars);
        console.log(err);
      });
  };

  const handleDelete = (id: string) => {
    const originalStars = [...stars];
    const newStars = stars.filter((star) => star._id !== id);
    setStars(newStars);

    axios
      .delete("http://localhost:3000/stars/" + id)
      .then(() => {
        triggerToast("Deleted !", true);
      })
      .catch((err) => {
        triggerToast(err.message, false);
        setStars(originalStars);
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex w-full h-full relative">
        {/* {isLoading && (
          <div className="flex absolute w-full h-full justify-center items-center backdrop-blur-lg bg-slate-900/30">
            <PuffLoader color="#fff" />
          </div>
        )} */}

        <motion.div
          animate={{ x: 100 }}
          transition={{ type: "spring", stiffness: 100 }}
        />

        <div className="flex flex-col p-4 bg-slate-900 w-1/2 min-h-screen">
          <StarForm onSubmit={handleFormSubmit} />
        </div>
        <div className="flex flex-col gap-4 p-4 w-1/2 bg-slate-900 h-screen overflow-y-scroll">
          <StarCards
            stars={stars}
            onStarDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default App;
