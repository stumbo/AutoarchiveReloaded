/*!
Copyright 2013-2018 Brummolix (new version AutoarchiveReloaded, https://github.com/Brummolix/AutoarchiveReloaded )
Copyright 2012 Alexey Egorov (original version Autoarchive, http://code.google.com/p/autoarchive/ )

 This file is part of AutoarchiveReloaded.

    AutoarchiveReloaded is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    AutoarchiveReloaded is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with AutoarchiveReloaded.  If not, see <http://www.gnu.org/licenses/>.
*/
namespace AutoarchiveReloaded
{
	export class AppInfoLogger
	{
		public async log(): Promise<void>
		{
			await this.logAppInfo();
			this.logAddonInfo();
			await this.logAccountInfo();
		}

		private async logAppInfo(): Promise<void>
		{
			try
			{
				const window: BrowserWindow = browser.extension.getBackgroundPage();
				const browserInfo: BrowserInfo = await browser.runtime.getBrowserInfo();

				loggerWebExtension.info("Application: " + browserInfo.vendor + " " + browserInfo.name + " version " + browserInfo.version + " (" + browserInfo.buildID + ")");
				loggerWebExtension.info("SystemInfo: " +  window.navigator.userAgent + "| " + window.navigator.platform);
				loggerWebExtension.info("Language: " + window.navigator.language);
			}
			catch (e)
			{
				loggerWebExtension.errorException(e);
				//don't throw... this method is only info logging...
			}
		}

		private logAddonInfo(): void
		{
			//we could get infos about addons with the browser.management API, but then we would also need the "management" permission
			//seem to be a bit overdosed only for logging of the information
		}

		private async logAccountInfo(): Promise<void>
		{
			try
			{
				await AccountIterator.forEachAccount((account: MailAccount, isAccountArchivable: boolean) =>
				{
					loggerWebExtension.info("Account Info: '" + account.name + "'; type: " +
						account.type + "; id: " + account.id);
				});
			}
			catch (e)
			{
				loggerWebExtension.errorException(e);
				//don't throw... this method is only info logging...
			}
		}
	}
}