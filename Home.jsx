import "./home.css";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
export const Home=()=>{
    const [data,setdata]=useState({
        Title:"",
        Text:""
    });
    const [alldata,setalldata]=useState([]);
    const func=async ()=>{
        try{
            const respo=await fetch("http://localhost:3000/show",{
                method:"GET"
            });
            //console.log(respo);
            const x=await respo.json();
            setalldata(x);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[]);
    const changfunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdata({
            ...data,
            [nm]:val
        })
    }
    const submitfunc=async ()=>{
        try{
            const respo=await fetch("http://localhost:3000/add",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({Title:data.Title,Text:data.Text})
            });
            console.log(respo);
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
                func();
                setdata({
                    Title:"",
                    Text:""
                })
            }
            else{
                Swal.fire({
                    text:x.msg,
                    icon:"error",
                    background:"white"
                })
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const func1=(id)=>{
        Swal.fire({
            text:"Are You Sure???",
            icon:"question",
            showConfirmButton:true,
            showCancelButton:true,
            cancelButtonText:"No",
            confirmButtonText:"Yes"
        }).then((x)=>{
            if(x.isConfirmed){
                delfunc(id);
            }
        })
    }
    const delfunc=async (id)=>{
        try{
            const respo=await fetch("http://localhost:3000/delete",{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"id":id})
            })
            console.log(respo);
            const x=await respo.json();
            if(x.msg){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                })
                func();
            }
            else{
                Swal.fire({
                    text:x.msg,
                    icon:"error",
                    background:"white"
                })
            }
        }
        catch(error){
            console.log(error);
        }
    }
    if(alldata.length!=0){
    return(
        <>
        <div className="main">
            <input 
            type="text"
            name="Title"
            placeholder="Enter Your Title"
            id="i2"
            value={data.Title}
            onChange={changfunc}
            />
            <input 
            type="text"
            name="Text"
            placeholder="Enter Your Text"
            id="i1"
            value={data.Text}
            onChange={changfunc}
            />
            <center><button className="sayani" onClick={submitfunc}>ADD</button></center>
        </div>
        <div className="second">
            <table border="2px">
                <tr> 
                    <th>TITLE</th>
                    <th>TEXT</th>
                    <th>DELETE</th>
                </tr>
                {
                    alldata.map((cur,ind)=>{
                        return(
                            <>
                            <tr key={ind}>
                                <th>{cur.Title}</th>
                                <th>{cur.Text}</th>
                                <th><button onClick={()=>{func1(cur._id)}}>delete</button></th>
                            </tr>
                            </>
                        )
                    })
                }
            </table>
        </div>
        </>
    )
    }
    else{
        return(
            <>
            <div className="main">
            <input 
            type="text"
            name="Title"
            placeholder="Enter Your Title"
            id="i2"
            value={data.Title}
            onChange={changfunc}
            />
            <input 
            type="text"
            name="Text"
            placeholder="Enter Your Text"
            id="i1"
            value={data.Text}
            onChange={changfunc}
            />
            <center><button className="sayani" onClick={submitfunc}>ADD</button></center>
            </div>
            </>
        )
    }
}