import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		meta: { title: 'Inicio' },
		props: true
	},
	{
		path: '/book/create',
		name: 'CreateBook',
		component: () => import('@/views/CreateBook.vue'),
		meta: { title: 'Nuevo Registro' }
	},
	{
		path: '/book/:id',
		name: 'OpenBook',
		component: () => import('@/views/ViewBook.vue')
	},
	{
		path: '/book/:id/update',
		name: 'UpdateBook',
		component: () => import('@/views/UpdateBook.vue'),
		meta: { title: 'Editar Resgitro' }
	},
	{
		path: '/books/inventory/page/:id',
		name: 'Inventory',
		component: () => import('@/views/Inventory.vue'),
		meta: { title: 'Inventario de Libros' }
	},
	{
	  path: '/:catchAll(.*)',
	  name: 'NotFound',
		component: () => import('@/views/NotFound.vue'),
	  meta:{title:'No se Encontro'}
	},
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
	routes
});
router.beforeEach((to, from, next) => {
	document.title = (to.meta.title == undefined) ? to.params.title : to.meta.title;
	next();
});

export default router;