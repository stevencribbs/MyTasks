//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TaskDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class Task
    {
        public int ID { get; set; }
        public string Data { get; set; }
        public Nullable<int> Priority { get; set; }
        public string Category { get; set; }
        public Nullable<int> Owner { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<int> TaskOrder { get; set; }
    }
}
