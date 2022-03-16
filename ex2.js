const getStudentFromId = (studentId)=>{
	return studentRecords.find(matchId = (record) => {
		return (record.id == studentId);
	});
}

const printRecords = (recordIds) => {
	var records = recordIds.map(getStudentFromId);
	records.sort(sortByNameAsc = (record1,record2)=>{
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	});

	records.forEach( printRecord = (record) => {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	});
}

const paidStudentsToEnroll = () => {
	var recordsToEnroll = studentRecords.filter(needToEnroll=(record)=>{
		return (record.paid && !currentEnrollment.includes(record.id));
	});

	var idsToEnroll = recordsToEnroll.map(getStudentId = (record) => {
		return record.id;
	});

	return [ ...currentEnrollment, ...idsToEnroll ];
}

const getStudentFromId2 = (studentId) => {
	return studentRecords.find(matchId = (record) => {
		return (record.paid == false && studentId==record.id);
	});
}

const remindUnpaid = (recordIds) => {
	var unpaids = recordIds.map(getStudentFromId2)
	unpaids = unpaids.filter(removeUndefined = (param) => {
		return (param != undefined)
	})
	unpaids.forEach(printRecord = (unpaid) => {
		console.log(`${unpaid.name} (${unpaid.id}): Not Paid`);
	});
}


// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
