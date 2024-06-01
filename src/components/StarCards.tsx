import {
  ClapperboardIcon,
  GlobeIcon,
  InstagramIcon,
  TrashIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { formSchemaType } from "./StarForm";
import { Skeleton } from "./ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Progress } from "./ui/progress";

export interface Star extends formSchemaType {
  _id: string;
}

type Props = {
  stars: Star[];
  onStarDelete: (id: string) => void;
  isLoading: boolean;
};
const StarCard = ({ stars, onStarDelete, isLoading }: Props) => {
  return (
    <>
      {isLoading && (
        <Card className="bg-slate-700 border-slate-600 cursor-pointer">
          <CardHeader className="flex flex-row gap-4">
            <div className="flex space-x-4">
              <Skeleton className="w-40 h-60 rounded-xl bg-slate-600" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-60 bg-slate-600" />
                <Skeleton className="h-4 w-40 bg-slate-600" />
                <Skeleton className="h-4 w-60 bg-slate-600" />
                <Skeleton className="h-20 w-full bg-slate-600" />
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
      {stars.map((star) => (
        <Card
          key={star._id}
          className="bg-slate-700 border-slate-600 cursor-pointer"
        >
          <CardHeader className="flex flex-row gap-4">
            <div>
              <img
                className="w-40 rounded-lg"
                src={"http://localhost:3000" + star.dp}
                alt={star.name}
              />
            </div>
            <div className="w-2/3">
              <CardTitle className="text-slate-200 text-3xl">
                {star.name}
              </CardTitle>
              <p className="text-slate-400 text-sm pt-2">
                {star.dob.toString()}
              </p>
              <div className="py-2">
                <Progress indicatorColor="bg-green-500"  value={star.rating * 20} className="w-40 h-2 bg-slate-500" />
              </div>
              <div className="flex">
                <div className="flex py-4 gap-4">
                  <a href={star.ig_link}>
                    <InstagramIcon className="text-slate-400 hover:text-pink-600 transition-colors" />
                  </a>
                  <a href={star.x_link}>
                    <TwitterIcon className="text-slate-400 hover:text-sky-600 transition-colors" />
                  </a>
                  <a href={star.ph_link}>
                    <ClapperboardIcon className="text-slate-400 hover:text-yellow-600 transition-colors" />
                  </a>
                  <a href={star.of_link}>
                    <YoutubeIcon className="text-slate-400 hover:text-blue-600 transition-colors" />
                  </a>
                  <a href={star.web}>
                    <GlobeIcon className="text-slate-400 hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
              <p className="text-slate-400">
                {star.bio.substring(0, 250) + "..."}
              </p>
            </div>
          </CardHeader>
          <CardFooter className="relative flex items-end justify-end">
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <TrashIcon className="text-white hover:text-red-600" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {star.name} and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onStarDelete(star._id);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default StarCard;
