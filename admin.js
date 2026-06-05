const ctx = document.getElementById("revenueChart");

new Chart(ctx,{
type:"line",
data:{
labels:["T1","T2","T3","T4","T5","T6"],
datasets:[{
label:"Doanh thu (triệu đồng)",
data:[12,18,15,25,32,40],
tension:0.4
}]
}
});

document.querySelectorAll(".delete").forEach(btn=>{
btn.onclick=()=>{
if(confirm("Xóa phim này?")){
btn.closest("tr").remove();
}
}
});

document.querySelector(".add-btn").onclick=()=>{
alert("Chức năng thêm phim");
};