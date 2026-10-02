import { useState } from "react";
import Button from "../../../shared/components/buttons/Button";
import AlertModal from "../../../shared/components/modals/AlertModal";
import FormModal from "../../../shared/components/modals/FormModal";
import Message from "../../../shared/components/feedback/Message";
import {
  showToast,
  showSuccess,
  showError,
  showInfo,
  showWarning,
  showLoading,
  showPromise,
  showAction,
  showCustom,
  dismissToast,
} from "../../../shared/components/feedback/Toast";
import { SectionTitle, ExampleBlock } from "../types/showcaseData";
import StarIcon from "../../../assets/icons/StarIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";

const ModalsTab = () => {
  /* ── Alert Modal states ── */
  const [alertInfo, setAlertInfo] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertWarning, setAlertWarning] = useState(false);
  const [alertDanger, setAlertDanger] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
  const [alertLoading, setAlertLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alertCustom, setAlertCustom] = useState(false);

  /* ── Form Modal states ── */
  const [addUserModal, setAddUserModal] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formNotify, setFormNotify] = useState(true);

  return (
    <div className="space-y-10">
      {/* ═══════════════════════════════════════════════
          ALERT MODAL
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Alert Modal — Info" description="Simple info notification." />
      <ExampleBlock>
        <Button variant="info" onClick={() => setAlertInfo(true)}>Show Info Alert</Button>
        <AlertModal
          open={alertInfo}
          onClose={() => setAlertInfo(false)}
          type="info"
          message="Your account settings have been updated. Changes will take effect immediately."
        />
      </ExampleBlock>

      <SectionTitle title="Alert Modal — Success" description="Success confirmation with title." />
      <ExampleBlock>
        <Button variant="success" onClick={() => setAlertSuccess(true)}>Show Success Alert</Button>
        <AlertModal
          open={alertSuccess}
          onClose={() => setAlertSuccess(false)}
          type="success"
          title="Payment Successful!"
          message="Your payment of $49.99 has been processed. A receipt has been sent to your email."
        />
      </ExampleBlock>

      <SectionTitle title="Alert Modal — Warning" description="Warning with confirm action." />
      <ExampleBlock>
        <Button variant="warning" onClick={() => setAlertWarning(true)}>Show Warning Alert</Button>
        <AlertModal
          open={alertWarning}
          onClose={() => setAlertWarning(false)}
          type="warning"
          title="Unsaved Changes"
          message="You have unsaved changes that will be lost if you leave this page. Are you sure you want to continue?"
          onConfirm={() => setAlertWarning(false)}
        />
      </ExampleBlock>

      <SectionTitle title="Alert Modal — Danger / Error" description="Error alert." />
      <ExampleBlock>
        <Button variant="danger" onClick={() => setAlertDanger(true)}>Show Error Alert</Button>
        <AlertModal
          open={alertDanger}
          onClose={() => setAlertDanger(false)}
          type="danger"
          title="Connection Failed"
          message="Unable to connect to the server. Please check your internet connection and try again."
        />
      </ExampleBlock>

      <SectionTitle title="Alert Modal — Confirm Action" description="Publish confirmation." />
      <ExampleBlock>
        <Button variant="primary" onClick={() => setAlertConfirm(true)}>Publish Article</Button>
        <AlertModal
          open={alertConfirm}
          onClose={() => setAlertConfirm(false)}
          type="confirm"
          title="Publish Article?"
          message="This will make your article visible to all users. You can unpublish it later from the dashboard."
          confirmText="Yes, Publish"
          onConfirm={() => setAlertConfirm(false)}
        />
      </ExampleBlock>

      <SectionTitle title="Alert Modal — Delete Confirmation" description="Destructive action confirmation." />
      <ExampleBlock>
        <Button variant="danger" onClick={() => setAlertDelete(true)}>Delete Account</Button>
        <AlertModal
          open={alertDelete}
          onClose={() => setAlertDelete(false)}
          type="delete"
          title="Delete Account?"
          message="This action is permanent and cannot be undone. All your data, projects, and settings will be permanently removed."
          confirmText="Yes, Delete"
          cancelText="Keep Account"
          onConfirm={() => setAlertDelete(false)}
        />
      </ExampleBlock>

      <SectionTitle title="Alert Modal — With Loading" description="Delete with loading state." />
      <ExampleBlock>
        <Button variant="danger" onClick={() => { setAlertLoading(true); setDeleteLoading(false); }}>Delete with Loading</Button>
        <AlertModal
          open={alertLoading}
          onClose={() => setAlertLoading(false)}
          type="delete"
          title="Delete Project?"
          message="This will permanently delete the project and all associated files."
          confirmText="Delete Project"
          loading={deleteLoading}
          onConfirm={() => {
            setDeleteLoading(true);
            setTimeout(() => {
              setDeleteLoading(false);
              setAlertLoading(false);
            }, 2000);
          }}
        />
      </ExampleBlock>

      <SectionTitle title="Alert Modal — Custom Content" description="Alert with child content." />
      <ExampleBlock>
        <Button variant="dark" onClick={() => setAlertCustom(true)}>Show Custom Alert</Button>
        <AlertModal
          open={alertCustom}
          onClose={() => setAlertCustom(false)}
          type="warning"
          title="Storage Almost Full"
          message="You've used 90% of your storage quota."
          confirmText="Upgrade Plan"
          onConfirm={() => setAlertCustom(false)}
        >
          <div className="w-full sc-panel rounded-full h-3 mt-2 mb-1">
            <div className="sc-warning-bg h-3 rounded-full" style={{ width: "90%" }} />
          </div>
          <p className="text-xs sc-muted">4.5 GB of 5 GB used</p>
        </AlertModal>
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          FORM MODAL
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Form Modal — Add User" description="Create new user form modal." />
      <ExampleBlock>
        <Button variant="primary" icon={<PlusIcon className="w-4 h-4" />} onClick={() => { setFormName(""); setFormEmail(""); setFormRole(""); setFormBio(""); setAddUserModal(true); }}>
          Add New User
        </Button>
        <FormModal
          open={addUserModal}
          onClose={() => setAddUserModal(false)}
          title="Add New User"
          subtitle="Fill in the details to create a new user account"
          submitText="Create User"
          loading={addUserLoading}
          icon={
            <UserIcon className="w-5 h-5" />
          }
          onSubmit={() => {
            setAddUserLoading(true);
            setTimeout(() => {
              setAddUserLoading(false);
              setAddUserModal(false);
            }, 1500);
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium sc-text mb-1.5">Full Name</label>
              <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Enter full name" className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium sc-text mb-1.5">Email Address</label>
              <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="Enter email address" className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium sc-text mb-1.5">Role</label>
              <select value={formRole} onChange={(e) => setFormRole(e.target.value)} className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all sc-panel">
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium sc-text mb-1.5">Bio</label>
              <textarea value={formBio} onChange={(e) => setFormBio(e.target.value)} placeholder="Write a short bio..." rows={3} className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all resize-none" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sc-notify-user" checked={formNotify} onChange={(e) => setFormNotify(e.target.checked)} className="w-4 h-4 sc-link rounded sc-divider sc-focus-ring" />
              <label htmlFor="sc-notify-user" className="text-sm sc-text">Send welcome email notification</label>
            </div>
          </div>
        </FormModal>
      </ExampleBlock>

      <SectionTitle title="Form Modal — Edit User" description="Pre-filled edit form." />
      <ExampleBlock>
        <Button variant="secondary" onClick={() => { setFormName("Ahmed Al-Shatub"); setFormEmail("ahmed@example.com"); setFormRole("admin"); setFormBio("Senior developer with 8 years of experience."); setEditUserModal(true); }}>
          Edit User
        </Button>
        <FormModal
          open={editUserModal}
          onClose={() => setEditUserModal(false)}
          title="Edit User"
          subtitle="Update the user's profile information"
          submitText="Save Changes"
          submitVariant="success"
          icon={
            <EditIcon className="w-5 h-5" />
          }
          onSubmit={() => setEditUserModal(false)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 sc-page rounded-xl mb-2">
              <div className="w-14 h-14 rounded-full sc-icon-primary-bg flex items-center justify-center sc-link font-bold text-lg flex-shrink-0">
                {formName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold sc-subheading">{formName}</p>
                <p className="text-xs sc-muted">{formEmail}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium sc-text mb-1.5">Full Name</label>
                <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium sc-text mb-1.5">Email Address</label>
                <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium sc-text mb-1.5">Role</label>
              <select value={formRole} onChange={(e) => setFormRole(e.target.value)} className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all sc-panel">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium sc-text mb-1.5">Bio</label>
              <textarea value={formBio} onChange={(e) => setFormBio(e.target.value)} rows={3} className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all resize-none" />
            </div>
          </div>
        </FormModal>
      </ExampleBlock>

      <SectionTitle title="Form Modal — Settings" description="XL settings modal with sections." />
      <ExampleBlock>
        <Button variant="dark" onClick={() => setSettingsModal(true)}>Open Settings</Button>
        <FormModal
          open={settingsModal}
          onClose={() => setSettingsModal(false)}
          title="Project Settings"
          subtitle="Manage your project configuration"
          size="xl"
          submitText="Apply Settings"
          submitVariant="dark"
          icon={
            <SettingsIcon className="w-5 h-5" />
          }
          footerExtra={<p className="text-xs sc-muted">Last updated 2 hours ago</p>}
          onSubmit={() => setSettingsModal(false)}
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold sc-subheading mb-3">General</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium sc-text mb-1.5">Project Name</label>
                  <input type="text" defaultValue="My Awesome Project" className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium sc-text mb-1.5">Project URL</label>
                  <input type="text" defaultValue="my-awesome-project" className="w-full px-3 py-2.5 text-sm border sc-divider rounded-lg focus:outline-none focus:ring-2 sc-focus-ring focus:border-transparent transition-all" />
                </div>
              </div>
            </div>
            <div className="h-px sc-panel" />
            <div>
              <h4 className="text-sm font-semibold sc-subheading mb-3">Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 sc-page rounded-lg cursor-pointer hover:sc-panel transition-colors">
                  <div>
                    <p className="text-sm font-medium sc-text">Email Notifications</p>
                    <p className="text-xs sc-muted">Receive updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 sc-link rounded sc-divider sc-focus-ring" />
                </label>
                <label className="flex items-center justify-between p-3 sc-page rounded-lg cursor-pointer hover:sc-panel transition-colors">
                  <div>
                    <p className="text-sm font-medium sc-text">Push Notifications</p>
                    <p className="text-xs sc-muted">Browser push notifications</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 sc-link rounded sc-divider sc-focus-ring" />
                </label>
                <label className="flex items-center justify-between p-3 sc-page rounded-lg cursor-pointer hover:sc-panel transition-colors">
                  <div>
                    <p className="text-sm font-medium sc-text">Weekly Digest</p>
                    <p className="text-xs sc-muted">Summary of weekly activity</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 sc-link rounded sc-divider sc-focus-ring" />
                </label>
              </div>
            </div>
            <div className="h-px sc-panel" />
            <div>
              <h4 className="text-sm font-semibold sc-subheading mb-3">Danger Zone</h4>
              <div className="p-4 border sc-danger-border rounded-lg sc-danger-light-bg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium sc-danger-text">Delete Project</p>
                    <p className="text-xs sc-danger-text">This action is irreversible</p>
                  </div>
                  <button type="button" className="px-3 py-1.5 text-xs font-semibold sc-danger-text border sc-danger-border rounded-lg hover:sc-panel transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FormModal>
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          TOAST — BASIC TYPES
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Toast — Basic Types" description="Standard toast notifications." />
      <ExampleBlock>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => showToast("This is a default toast")}>Default</Button>
          <Button variant="success" onClick={() => showSuccess("Operation completed successfully!")}>Success</Button>
          <Button variant="danger" onClick={() => showError("Something went wrong!")}>Error</Button>
          <Button variant="info" onClick={() => showInfo("Here is some useful information")}>Info</Button>
          <Button variant="warning" onClick={() => showWarning("Please be careful with this action")}>Warning</Button>
        </div>
      </ExampleBlock>

      <SectionTitle title="Toast — With Description" description="Toasts with additional context." />
      <ExampleBlock>
        <div className="flex flex-wrap gap-3">
          <Button variant="success" onClick={() => showSuccess("File uploaded", { description: "Your file has been uploaded and processed successfully." })}>
            Success with Description
          </Button>
          <Button variant="danger" onClick={() => showError("Upload failed", { description: "The file size exceeds the maximum limit of 10MB." })}>
            Error with Description
          </Button>
          <Button variant="info" onClick={() => showInfo("New update available", { description: "Version 2.4.0 is ready to install. Restart to apply changes." })}>
            Info with Description
          </Button>
        </div>
      </ExampleBlock>

      <SectionTitle title="Toast — With Action Button" description="Toasts with undo actions." />
      <ExampleBlock>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => showAction("Message archived", "Undo", () => showSuccess("Message restored"))}>
            With Undo Action
          </Button>
          <Button variant="danger" onClick={() => showAction("3 items deleted", "Undo", () => showSuccess("Items restored successfully"), { description: "These items have been moved to trash." })}>
            Delete with Undo
          </Button>
        </div>
      </ExampleBlock>

      <SectionTitle title="Toast — Loading & Promise" description="Async operation toasts." />
      <ExampleBlock>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => {
            const id = showLoading("Uploading file...");
            setTimeout(() => { dismissToast(id); showSuccess("File uploaded successfully!"); }, 2500);
          }}>
            Loading Toast
          </Button>
          <Button variant="primary" onClick={() => showPromise(new Promise((resolve) => setTimeout(resolve, 2000)), { loading: "Saving changes...", success: "All changes saved!", error: "Failed to save changes" })}>
            Promise Toast
          </Button>
          <Button variant="info" onClick={() => showPromise(new Promise((_resolve, reject) => setTimeout(reject, 2000)), { loading: "Sending email...", success: "Email sent!", error: "Failed to send email. Please try again." })}>
            Promise Error Toast
          </Button>
        </div>
      </ExampleBlock>

      <SectionTitle title="Toast — Custom Duration & Position" description="Control toast timing." />
      <ExampleBlock>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => showSuccess("This stays for 10 seconds", { duration: 10000 })}>Long Duration (10s)</Button>
          <Button variant="secondary" onClick={() => showInfo("This disappears quickly", { duration: 1500 })}>Short Duration (1.5s)</Button>
          <Button variant="dark" onClick={() => showInfo("Persistent toast — close manually", { duration: Infinity })}>Persistent Toast</Button>
        </div>
      </ExampleBlock>

      <SectionTitle title="Toast — Custom with Icon" description="Toasts with custom icons." />
      <ExampleBlock>
        <div className="flex flex-wrap gap-3">
          <Button variant="warning" onClick={() => showCustom("New star received!", "Someone starred your repository.", <StarIcon className="w-5 h-5 sc-warning-text" />)}>
            Star Icon Toast
          </Button>
          <Button variant="primary" onClick={() => showCustom("Download complete", "Your file is ready in the downloads folder.", <DownloadIcon className="w-5 h-5 sc-link" />)}>
            Download Icon Toast
          </Button>
        </div>
      </ExampleBlock>

      <SectionTitle title="Toast — Dismiss All" description="Show multiple and dismiss." />
      <ExampleBlock>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => {
            showSuccess("Toast 1");
            setTimeout(() => showInfo("Toast 2"), 200);
            setTimeout(() => showWarning("Toast 3"), 400);
          }}>
            Show Multiple Toasts
          </Button>
          <Button variant="danger" onClick={() => dismissToast()}>Dismiss All</Button>
        </div>
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          MESSAGE
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Message — Default" description="Standard inline messages." />
      <ExampleBlock>
        <div className="space-y-3">
          <Message variant="info">This is an informational message for your reference.</Message>
          <Message variant="success">Operation completed successfully!</Message>
          <Message variant="warning">Please review your settings before proceeding.</Message>
          <Message variant="danger">An error occurred while processing your request.</Message>
        </div>
      </ExampleBlock>

      <SectionTitle title="Message — With Title" description="Messages with headings." />
      <ExampleBlock>
        <div className="space-y-3">
          <Message variant="info" title="Did you know?">You can customize your dashboard layout by dragging and dropping widgets.</Message>
          <Message variant="success" title="Payment Received">Your payment of $49.99 has been successfully processed and a receipt has been sent to your email.</Message>
          <Message variant="warning" title="Storage Almost Full">You have used 90% of your storage quota. Consider upgrading your plan or removing unused files.</Message>
          <Message variant="danger" title="Connection Lost">Unable to connect to the server. Please check your internet connection and try again.</Message>
        </div>
      </ExampleBlock>

      <SectionTitle title="Message — Closable" description="Dismissible messages." />
      <ExampleBlock>
        <div className="space-y-3">
          <Message variant="info" title="Tip" closable>Click the close button to dismiss this message.</Message>
          <Message variant="success" closable>Your profile has been updated.</Message>
        </div>
      </ExampleBlock>

      <SectionTitle title="Message — Bordered" description="Left border accent style." />
      <ExampleBlock>
        <div className="space-y-3">
          <Message variant="info" bordered title="Note">This message uses a left border accent style.</Message>
          <Message variant="success" bordered>File uploaded and processed.</Message>
          <Message variant="warning" bordered title="Caution">This action cannot be undone.</Message>
          <Message variant="danger" bordered>Authentication failed. Please login again.</Message>
        </div>
      </ExampleBlock>

      <SectionTitle title="Message — Filled" description="Solid background messages." />
      <ExampleBlock>
        <div className="space-y-3">
          <Message variant="info" filled title="System Update">A new version is available. Please update to get the latest features.</Message>
          <Message variant="success" filled>All tests passed successfully!</Message>
          <Message variant="warning" filled>Your trial expires in 3 days.</Message>
          <Message variant="danger" filled title="Critical Error">Database connection failed. Contact support immediately.</Message>
        </div>
      </ExampleBlock>

      <SectionTitle title="Message — Without Icon" description="Clean text-only message." />
      <ExampleBlock>
        <Message variant="info" showIcon={false}>A simple message without an icon for a clean look.</Message>
      </ExampleBlock>

      <SectionTitle title="Message — Filled + Closable" description="Dismissible filled messages." />
      <ExampleBlock>
        <div className="space-y-3">
          <Message variant="info" filled closable title="Reminder">Don't forget to save your changes before leaving this page.</Message>
          <Message variant="danger" filled closable>Session expired. Please re-authenticate.</Message>
        </div>
      </ExampleBlock>
    </div>
  );
};

export default ModalsTab;
