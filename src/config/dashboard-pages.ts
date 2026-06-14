export class DashboardPages {
	static BASE = '/dashboard'

	static DASHBOARD = DashboardPages.BASE
	static PROJECTS = `${DashboardPages.BASE}/projects`

	static PROJECT_CREATE = `${DashboardPages.PROJECTS}?create=true`

	static PROJECT_EDIT(id: string) {
		return `${DashboardPages.PROJECTS}?edit=${id}`
	}

	static PROJECT_DETAILS(slug: string) {
		return `${DashboardPages.PROJECTS}/${slug}`
	}

	static TASK_EDIT(id: string) {
		return `${DashboardPages.BASE}/task/${id}/edit`
	}

	static INSIGHT = `${DashboardPages.BASE}/insight`
	static TEAM = `${DashboardPages.BASE}/team`
	static SCHEDULE = `${DashboardPages.BASE}/schedule`
	static ACTIVITIES = `${DashboardPages.BASE}/activities`
	static SETTINGS = `${DashboardPages.BASE}/settings`
}
