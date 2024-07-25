import sidebarData from '@/json/sidebar.json';

function extractPrivateRoutes(data) {
  let privateRoutes = [];

  function traverse(item) {
    if (item.private === true && item.route) {
      privateRoutes.push('/' + item.route);
    }
    if (item.children) {
      item.children.forEach(traverse);
    }
  }

  data.forEach(traverse);
  return privateRoutes;
}

export const privateRoutes = extractPrivateRoutes(sidebarData);