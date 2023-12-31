import { useState } from "react";
import useTasks from "../../hooks/useTasks";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Tasks = () => {
    const [tasks, refetch] = useTasks();
    const [allTask, setAllTask] = useState(tasks);

    // handle delete task
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:5000/tasks/${id}`, {
                    method: 'DELETE'
                });

                if (res.ok) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    // handle search funtionality
    const handleSearch = (e) => {
        e.preventDefault();
        const text = e.target.value;
        if (text) {
            const filterTask = allTask?.filter(task => task?.title?.includes(text.toLowercase));
            setAllTask(filterTask);
        } else {
            setAllTask(tasks);
        }
    }



    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 py-8">
            <div>
                <div className="p-4 bg-[#CAD9F6] border rounded">
                    <div>
                        <h2 className="text-sm font-semibold">To do</h2>
                    </div>
                    {/* to  do here */}
                    {
                        tasks?.filter(task => task?.status?.includes('to-do'))?.map((task, idx) => <>
                            <div className="bg-white rounded p-2 mt-2" key={idx}>
                                <div className="flex justify-between items-center">
                                    <h2 className="font-bold text-base">{task?.title}</h2>
                                    <div className="flex gap-2">
                                        <Link to={`/dashboard/updateTask/${task._id}`}><MdOutlineModeEditOutline /></Link>
                                        <RiDeleteBin6Line onClick={() => handleDelete(task?._id)} />
                                    </div>
                                </div>
                                <p className="text-[#5C5C5C] text-sm mt-1">{task?.description}</p>
                            </div>
                        </>)
                    }
                </div>
            </div>
            <div>
                <div className="p-4 bg-[#FFE4C2] border rounded">
                    <div>
                        <h2 className="text-sm font-semibold">On Going</h2>
                    </div>
                    {/* on going to do here */}
                    {
                        tasks?.filter(task => task?.status?.includes('on-going'))?.map((task, idx) => <>
                            <div className="bg-white rounded p-2 mt-2" key={idx}>
                                <div className="flex justify-between items-center">
                                    <h2 className="font-bold  text-base">{task?.title}</h2>
                                    <div className="flex gap-2">
                                        <MdOutlineModeEditOutline />
                                        <RiDeleteBin6Line />
                                    </div>
                                </div>
                                <p className="text-[#5C5C5C] text-sm mt-1">{task?.description}</p>
                            </div>
                        </>)
                    }
                </div>
            </div>
            <div>
                <div className="p-4 bg-[#FAD0C6] border rounded">
                    <div>
                        <h2 className="text-sm font-semibold">Completed</h2>
                    </div>
                    {/* completed to do here */}
                    {
                        tasks?.filter(task => task?.status?.includes('completed'))?.map((task, idx) => <>
                            <div className="bg-white rounded p-2 mt-2" key={idx}>
                                <div className="flex justify-between items-center">
                                    <h2 className="font-bold text-base">{task?.title}</h2>
                                    <div className="flex gap-2">
                                        <MdOutlineModeEditOutline />
                                        <RiDeleteBin6Line />
                                    </div>
                                </div>
                                <p className="text-[#5C5C5C] text-sm mt-1">{task?.description}</p>
                            </div>
                        </>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Tasks;