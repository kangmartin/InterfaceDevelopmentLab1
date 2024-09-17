fetch('http://localhost:3000/data/')
    .then(res => res.text())
    .then(data => {
      const result = processData(data);

      const unique = arr => [...new Set(arr)];

      const averageLength = (arr) => {
        if (arr.length === 0) return 0;
        return arr.reduce((sum, name) => sum + name.length, 0) / arr.length;
      };

      // 1. First project's name in ascending order (case-insensitive, diacritics handled)
      const normalize = str => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const firstProjectName = () => {
        const sortedProjects = unique(result.map(r => normalize(r.projectName)))
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        return sortedProjects[0];
      };
      console.log('First Project Name:', firstProjectName());

      // 2. Number of unique contributors
      const uniqueContributors = unique(result.map(r => r.username));
      console.log('Number of Unique Contributors:', uniqueContributors.length);

      // 3. Average length of contributors' names
      const averageContributorNameLength = () => {
        const uniqueNames = unique(result.map(r => r.username));
        return averageLength(uniqueNames);
      };
      console.log('Average Length of Contributor Names:', averageContributorNameLength());

      // 4. Most active contributor's name (by number of projects)
      const mostActiveContributor = () => {
        const projectCount = result.reduce((acc, r) => {
          acc[r.username] = (acc[r.username] || 0) + 1;
          return acc;
        }, {});
        const sortedContributors = Object.entries(projectCount)
            .sort((a, b) => b[1] - a[1])
            .map(([name]) => name);
        return sortedContributors[0];
      };
      console.log('Most Active Contributor:', mostActiveContributor());

      // 5. TOP 10 most contributed projects
      const top10Projects = () => {
        const projectCount = result.reduce((acc, r) => {
          acc[r.projectName] = (acc[r.projectName] || 0) + 1;
          return acc;
        }, {});
        return Object.entries(projectCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([name, count]) => ({ projectName: name, count }));
      };
      console.log('TOP 10 Most Contributed Projects:', top10Projects());
    })
    .catch(console.log);

// Functional style function
function processData(data) {
  const [headerLine, ...lines] = data.split('\n');
  const headers = headerLine.split(',');

  return lines.map(line => {
    const columns = line.split(',');
    return {
      username: columns[headers.indexOf('svn_id')],
      realName: columns[headers.indexOf('real_name')],
      website: columns[headers.indexOf('website')] || null,
      projectName: columns[headers.indexOf('project_name')]
    };
  });
}
