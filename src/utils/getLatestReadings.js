export function getLatestReadings(data){
    data.sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));
    
    // Step 2: Group by tenantName and get the latest readingDate for each tenantName
    const groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.tenantName]) {
            groupedData[item.tenantName] = item;
        }
    });
    
    // Step 3: Convert groupedData object back to array format if needed
    return(Object.values(groupedData))
    
}