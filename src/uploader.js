import Uppy from "@uppy/core";
import Dropbox from "@uppy/dropbox";
import Dashboard from "@uppy/dashboard";
import GoogleDrive from "@uppy/google-drive";
import AWSS3Multipart from "@uppy/aws-s3-multipart";

// And their styles (for UI plugins)
require("@uppy/core/dist/style.css");
require("@uppy/dashboard/dist/style.css");

export class Uploader {
  constructor(options) {
    const {
      companionUrl,
      trigger,
      onComplete,
      restrictions = {},
      meta = {},
    } = options;

    this.uppy = new Uppy({ restrictions, meta })
      .use(Dashboard, { trigger })
      .use(Dropbox, { target: Dashboard, companionUrl })
      .use(GoogleDrive, { target: Dashboard, companionUrl })
      .use(AWSS3Multipart, { limit: 4, companionUrl })
      .on("complete", onComplete);
  }

  isModalOpen() {
    const dashboard = this.uppy.getPlugin("Dashboard");
    return dashboard.isModalOpen();
  }

  closeModal() {
    const dashboard = this.uppy.getPlugin("Dashboard");
    if (dashboard.isModalOpen()) {
      return dashboard.closeModal();
    }
  }
}
