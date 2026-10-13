import React, { useState } from 'react'
import Navbar from "@/components/shared/Navbar";
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, BriefcaseIcon, LinkIcon, LayoutGrid, ArrowLeft, Building2 } from 'lucide-react'
import useGetAllAdminCompanies from '@/hooks/useGetAdminCompanies';

const PostJob: React.FC = () => {
    useGetAllAdminCompanies();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
        jobWebsite: "",
        category: ""
    });

    const jobCategories = ["Engineering", "Design", "Marketing", "Data Science", "Sales", "Finance"];
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector((store: any) => store.company);

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value: string) => {
        setInput({ ...input, companyId: value });
    };

    const categoryChangeHandler = (value: string) => {
        setInput({ ...input, category: value });
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.companyId) return toast.error("Please select a company");
        if (!input.category) return toast.error("Please select a category");

        try {
            setLoading(true);

            const payload = {
                ...input,
                position: Number(input.position),
            };

            const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-muted/40">
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 px-4'>
                <button
                    onClick={() => navigate("/admin/jobs")}
                    className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to jobs
                </button>

                <form onSubmit={submitHandler} className='rounded-2xl border border-border bg-card p-8 shadow-sm'>
                    <div className="flex items-center gap-2.5 mb-8 border-b border-border pb-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <BriefcaseIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="font-display text-2xl font-semibold text-foreground leading-tight">Post a new opportunity</h1>
                            <p className="text-sm text-muted-foreground">Fill in the details below — you can edit this later.</p>
                        </div>
                    </div>

                    {/* --- ROLE BASICS --- */}
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Role basics</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className="space-y-1.5">
                            <Label className="font-semibold">Job title</Label>
                            <Input placeholder="e.g. Senior Frontend Developer" type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-primary" />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <LayoutGrid className="h-4 w-4 text-primary" />
                                <Label className="font-semibold">Job category</Label>
                            </div>
                            <Select value={input.category} onValueChange={categoryChangeHandler}>
                                <SelectTrigger className="w-full focus-visible:ring-primary">
                                    <SelectValue placeholder="Select field" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {jobCategories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <Label className="font-semibold">Description</Label>
                            <Input placeholder="Briefly describe the role" type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <Label className="font-semibold">Requirements (skills)</Label>
                            <Input placeholder="React, Node.js, Tailwind..." type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-primary" />
                        </div>
                    </div>

                    {/* --- COMPENSATION & LOGISTICS --- */}
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-8 mb-4 border-t border-border pt-6">Compensation & logistics</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className="space-y-1.5">
                            <Label className="font-semibold">Salary (LPA)</Label>
                            <Input placeholder="e.g. 12" type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="font-semibold">Location</Label>
                            <Input placeholder="e.g. Remote, Bangalore" type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="font-semibold">Job type</Label>
                            <Input placeholder="e.g. Full-time, Internship" type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="font-semibold">Experience level (years)</Label>
                            <Input placeholder="e.g. 2" type="number" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="font-semibold">No. of positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-primary" />
                        </div>
                    </div>

                    {/* --- EXTERNAL LINK --- */}
                    <div className="mt-6 rounded-xl border border-dashed border-border bg-primary/5 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <LinkIcon className="h-4 w-4 text-primary" />
                            <Label className="font-semibold">External application link</Label>
                            <span className="text-xs text-muted-foreground font-normal">(optional)</span>
                        </div>
                        <Input
                            placeholder="Your company's application page or website"
                            type="text"
                            name="jobWebsite"
                            value={input.jobWebsite}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-primary bg-card"
                        />
                    </div>

                    {/* --- COMPANY --- */}
                    <div className="mt-8 border-t border-border pt-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <Label className="font-semibold">Which company is this for?</Label>
                        </div>
                        {companies.length > 0 ? (
                            <Select value={input.companyId} onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-full md:w-[320px]">
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {companies.map((company: any) => (
                                            <SelectItem key={company._id} value={company._id}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <p className='text-sm text-destructive font-medium'>
                                No companies found — register a company first.
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <Button disabled className="w-full mt-8 h-12 font-semibold">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting job...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={companies.length === 0}
                            className="w-full mt-8 h-12 font-semibold"
                        >
                            Publish job
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;