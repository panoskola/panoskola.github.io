/* Site content in two languages. Edit text here; the page renders from it. */
window.SITE = {
  ui: {
    en: {
      'nav.about': 'About', 'nav.stack': 'Stack', 'nav.experience': 'Experience',
      'nav.lab': 'Home Lab', 'nav.projects': 'Projects', 'nav.certs': 'Credentials', 'nav.contact': 'Contact',
      'hero.kicker': 'Athens, Greece · 9+ years in IT',
      'hero.tagline': 'IT Administrator. I’ve looked after accounts, devices and security for staff in 22 countries.',
      'hero.cv': 'Download CV', 'hero.terminal': 'Open terminal', 'hero.contact': 'Get in touch',
      'hero.hint': 'Tip: press <kbd>`</kbd> anywhere to open the terminal',
      'stat.years': 'Years in IT', 'stat.countries': 'Countries supported',
      'stat.tz': 'Time zones', 'stat.apple': 'Years Apple-certified repair',
      'about.label': 'About', 'about.title': 'Profile',
      'about.p1': 'I’m an IT Administrator in Athens with 9+ years in support and administration. At Blueground I started on the service desk and became IT Administrator. Users in 22 countries and six time zones reached IT through Jira Service Management, and I handled their accounts, access and devices in Google Workspace, JumpCloud, SentinelOne and Trend Micro Apex One.',
      'about.p2': 'At Dialectica I administered Microsoft 365, Google Workspace and NinjaRMM. Outside work I run a Windows Server 2022 and Active Directory lab on Hyper-V, and a self-hosted analytics server on Oracle Cloud (Linux, Docker). I write up every build and every fix as a runbook, and I’m studying for CompTIA Network+.',
      'about.f1t': 'Support', 'about.f1': 'Tickets triaged against SLAs, every fix written down.',
      'about.f2t': 'Access', 'about.f2': 'Onboarding, offboarding, MFA and role-based access across Google Workspace, Slack and Jira.',
      'about.f3t': 'Lab', 'about.f3': 'I break things on purpose and write down what happened.',
      'stack.label': 'Tools & Platforms', 'stack.title': 'Technical Stack',
      'exp.label': 'Track Record', 'exp.title': 'Experience',
      'lab.label': 'Hands-on', 'lab.title': 'Windows Server & AD Home Lab',
      'lab.intro': 'A Windows Server and Active Directory lab on Hyper-V, built to move from cloud-first administration into on-premises systems work. Every exercise is documented as a runbook: what I built, how I verified it, what broke, and the rule I took away.',
      'lab.topo': 'Topology', 'lab.broke': 'What broke, and what it taught me',
      'lab.roadmap': 'Build log & roadmap', 'lab.repo': 'View runbooks on GitHub',
      'lab.gw': 'gateway · intentionally absent', 'lab.lesson': 'Lesson',
      'lab.before': 'Before', 'lab.after': 'After the fix', 'lab.showfix': 'Show the fix', 'lab.showprob': 'Show the problem',
      'lab.try': 'Click a machine to run a command on it in the terminal.', 'a11y.skip': 'Skip to content', 'footer.email': 'Email', 'footer.updated': 'Last updated',
      'lab.done': 'Done', 'lab.next': 'Next',
      'nav.iac': 'IaC', 'iac.title': 'Infrastructure as Code: self-hosted analytics',
      'iac.intro': 'Infrastructure as code for the analytics service that counts visits to this site. One terraform apply and one ansible-playbook turn an empty Oracle Cloud account into a hardened, monitored, backed-up HTTPS service. Every change after that goes through a CI/CD pipeline with a manual approval gate.',
      'iac.repo': 'View code on GitHub', 'iac.pipe': 'Pipeline', 'iac.arch': 'Architecture', 'iac.sec': 'Security & reliability decisions',
      'iac.broke': 'What broke, and what it taught me', 'iac.why': 'Why',
      'iac.run': 'Run pipeline', 'iac.approve': 'Approve', 'iac.replay': 'Run again',
      'iac.pipenote': 'Terraform is validated in CI but applied by hand, because the cloud credentials never leave my machine.',
      'iac.drill': 'Stop node exporter', 'iac.drill.undo': 'Start node exporter', 'iac.arch.hint': 'Click the bucket to see the backup path.',
      'iac.drill.firing': 'firing', 'iac.drill.resolved': 'resolved', 'iac.alerts': 'alerts',
      'iac.note.drill': 'The Prometheus scrape fails, TargetDown fires, and Alertmanager posts to Discord. I tested this end to end by stopping the node exporter on the real server.',
      'iac.note.resolved': 'Restarted: the alert resolves and Discord gets a resolved message.',
      'iac.note.nightly': 'Every night at 03:15 pg_dump runs; at 03:30 the newest dump is uploaded to Object Storage as the VM itself (instance principal). Objects expire after 30 days, and a failed upload posts to Discord.',
      'iac.note.restore': 'Every Sunday the newest backup is downloaded, restored into a throwaway PostgreSQL container and checked, and the result goes to Discord. A backup that has never been restored is not a backup.',
      'proj.label': 'Built & running', 'proj.title': 'Projects',
      'proj.flow': 'Request path', 'proj.stack': 'Stack', 'proj.learned': 'What broke, and what it taught me',
      'proj.repo': 'View code & runbook on GitHub',
      'lab.break': 'Break it', 'lab.fix': 'Fix it',
      'lab.broken.note': 'DC01 now has CLIENT01’s address (192.168.10.50). Click it, or ping it in the terminal, and see what comes back.',
      'lab.fixed.note': 'DC01 is back on 192.168.10.10 and answers again.',
      'tool.hint': 'Click a tool to see where I used it.', 'tool.in': 'Used in', 'tool.clear': 'Clear', 'proj.play': 'Play the path', 'proj.replay': 'Play again', 'proj.pipeline': 'Pipeline', 'proj.learned2': 'What I learned', 'proj.code': 'View code on GitHub',
      'certs.label': 'Background', 'certs.title': 'Education & Credentials',
      'certs.edu': 'Education', 'certs.courses': 'Certifications & Training', 'certs.lang': 'Languages',
      'certs.prep': 'In preparation', 'certs.done': 'Completed',
      'contact.label': 'Contact', 'contact.title': 'Let’s talk',
      'contact.text': 'Open to IT Administrator and systems roles in Athens, hybrid or remote. The fastest way to reach me is email.',
      'contact.email': 'Email me', 'contact.copy': 'Copy email', 'contact.copied': 'Copied',
      'footer': 'Built with HTML, CSS & vanilla JavaScript, with help from Claude · Hosted on GitHub Pages',
      'theme.toggle': 'Toggle light / dark theme', 'lang.toggle': 'EN/ΕΛ — switch language',
      'term.title': 'pkola@lab: ~', 'term.close': 'Close terminal'
    },
    el: {
      'nav.about': 'Προφίλ', 'nav.stack': 'Τεχνολογίες', 'nav.experience': 'Εμπειρία',
      'nav.lab': 'Home Lab', 'nav.projects': 'Projects', 'nav.certs': 'Πιστοποιήσεις', 'nav.contact': 'Επικοινωνία',
      'hero.kicker': 'Αθήνα · 9+ χρόνια στο IT',
      'hero.tagline': 'IT Administrator. Έχω φροντίσει λογαριασμούς, συσκευές και ασφάλεια για προσωπικό σε 22 χώρες.',
      'hero.cv': 'Λήψη CV', 'hero.terminal': 'Άνοιγμα terminal', 'hero.contact': 'Επικοινωνία',
      'hero.hint': 'Tip: πάτα <kbd>`</kbd> οπουδήποτε για να ανοίξει το terminal',
      'stat.years': 'Χρόνια στο IT', 'stat.countries': 'Χώρες υποστήριξης',
      'stat.tz': 'Ζώνες ώρας', 'stat.apple': 'Χρόνια πιστοποιημένων επισκευών Apple',
      'about.label': 'Σχετικά', 'about.title': 'Προφίλ',
      'about.p1': 'Είμαι IT Administrator στην Αθήνα με 9+ χρόνια σε υποστήριξη και διαχείριση IT. Στη Blueground ξεκίνησα από το service desk και έγινα IT Administrator. Χρήστες σε 22 χώρες και έξι ζώνες ώρας απευθύνονταν στο IT μέσω Jira Service Management, και εγώ χειριζόμουν τους λογαριασμούς, την πρόσβαση και τις συσκευές τους σε Google Workspace, JumpCloud, SentinelOne και Trend Micro Apex One.',
      'about.p2': 'Στη Dialectica διαχειρίστηκα Microsoft 365, Google Workspace και NinjaRMM. Εκτός δουλειάς τρέχω ένα lab με Windows Server 2022 και Active Directory σε Hyper-V και έναν self-hosted server για analytics στο Oracle Cloud (Linux, Docker). Γράφω κάθε στήσιμο και κάθε διόρθωση ως runbook και προετοιμάζομαι για το CompTIA Network+.',
      'about.f1t': 'Υποστήριξη', 'about.f1': 'Tickets με προτεραιότητα βάσει SLA, κάθε λύση καταγεγραμμένη.',
      'about.f2t': 'Πρόσβαση', 'about.f2': 'Onboarding, offboarding, MFA και πρόσβαση βάσει ρόλων σε Google Workspace, Slack και Jira.',
      'about.f3t': 'Lab', 'about.f3': 'Χαλάω πράγματα σκόπιμα και γράφω τι έγινε.',
      'stack.label': 'Εργαλεία & Πλατφόρμες', 'stack.title': 'Τεχνολογίες',
      'exp.label': 'Διαδρομή', 'exp.title': 'Εμπειρία',
      'lab.label': 'Πρακτική', 'lab.title': 'Home Lab με Windows Server & AD',
      'lab.intro': 'Ένα lab με Windows Server και Active Directory σε Hyper-V, για να περάσω από τη διαχείριση cloud στα on-premises συστήματα. Κάθε άσκηση τεκμηριώνεται ως runbook: τι έστησα, πώς το επαλήθευσα, τι χάλασε και τι κανόνα κράτησα.',
      'lab.topo': 'Τοπολογία', 'lab.broke': 'Τι χάλασε και τι μου έμαθε',
      'lab.roadmap': 'Ημερολόγιο & επόμενα βήματα', 'lab.repo': 'Τα runbooks στο GitHub',
      'lab.gw': 'gateway · σκόπιμα ανύπαρκτο', 'lab.lesson': 'Μάθημα',
      'lab.before': 'Πριν', 'lab.after': 'Μετά τη διόρθωση', 'lab.showfix': 'Δες τη διόρθωση', 'lab.showprob': 'Δες το πρόβλημα',
      'lab.try': 'Πάτησε ένα μηχάνημα για να τρέξει μια εντολή στο terminal.', 'a11y.skip': 'Μετάβαση στο περιεχόμενο', 'footer.email': 'Email', 'footer.updated': 'Τελευταία ενημέρωση',
      'lab.done': 'Έγινε', 'lab.next': 'Επόμενο',
      'nav.iac': 'IaC', 'iac.title': 'Υποδομή ως κώδικας: self-hosted analytics',
      'iac.intro': 'Υποδομή ως κώδικας για την υπηρεσία analytics που μετράει τις επισκέψεις σε αυτό το site. Ένα terraform apply και ένα ansible-playbook μετατρέπουν έναν άδειο λογαριασμό Oracle Cloud σε ασφαλισμένη, παρακολουθούμενη υπηρεσία HTTPS με backups. Κάθε αλλαγή μετά περνάει από pipeline CI/CD με χειροκίνητο gate έγκρισης.',
      'iac.repo': 'Ο κώδικας στο GitHub', 'iac.pipe': 'Pipeline', 'iac.arch': 'Αρχιτεκτονική', 'iac.sec': 'Αποφάσεις ασφάλειας & αξιοπιστίας',
      'iac.broke': 'Τι χάλασε και τι μου έμαθε', 'iac.why': 'Γιατί',
      'iac.run': 'Τρέξε το pipeline', 'iac.approve': 'Έγκριση', 'iac.replay': 'Ξανά',
      'iac.pipenote': 'Το Terraform ελέγχεται στο CI αλλά εφαρμόζεται χειροκίνητα, γιατί τα cloud credentials δεν φεύγουν ποτέ από το μηχάνημά μου.',
      'iac.drill': 'Σταμάτα το node exporter', 'iac.drill.undo': 'Ξεκίνα το node exporter', 'iac.arch.hint': 'Πάτησε το bucket για να δεις τη διαδρομή του backup.',
      'iac.drill.firing': 'firing', 'iac.drill.resolved': 'resolved', 'iac.alerts': 'alerts',
      'iac.note.drill': 'Το scrape του Prometheus αποτυγχάνει, ενεργοποιείται το TargetDown και το Alertmanager στέλνει στο Discord. Το δοκίμασα από άκρη σε άκρη σταματώντας το node exporter στον πραγματικό server.',
      'iac.note.resolved': 'Ξαναξεκίνησε: το alert λύνεται και το Discord παίρνει μήνυμα resolved.',
      'iac.note.nightly': 'Κάθε βράδυ στις 03:15 τρέχει pg_dump· στις 03:30 το νεότερο dump ανεβαίνει στο Object Storage ως το ίδιο το VM (instance principal). Τα αντικείμενα λήγουν σε 30 ημέρες και μια αποτυχημένη μεταφόρτωση στέλνει μήνυμα στο Discord.',
      'iac.note.restore': 'Κάθε Κυριακή το νεότερο backup κατεβαίνει, γίνεται restore σε προσωρινό container PostgreSQL, ελέγχεται, και το αποτέλεσμα πηγαίνει στο Discord. Ένα backup που δεν έχει γίνει ποτέ restore δεν είναι backup.',
      'proj.label': 'Στημένα & σε λειτουργία', 'proj.title': 'Projects',
      'proj.flow': 'Διαδρομή αιτήματος', 'proj.stack': 'Τεχνολογίες', 'proj.learned': 'Τι χάλασε και τι μου έμαθε',
      'proj.repo': 'Κώδικας & runbook στο GitHub',
      'lab.break': 'Χάλασέ το', 'lab.fix': 'Διόρθωσέ το',
      'lab.broken.note': 'Το DC01 πήρε τη διεύθυνση του CLIENT01 (192.168.10.50). Πάτησέ το, ή κάνε ping από το terminal, και δες τι επιστρέφει.',
      'lab.fixed.note': 'Το DC01 γύρισε στη 192.168.10.10 και απαντά ξανά.',
      'tool.hint': 'Πάτησε ένα εργαλείο για να δεις πού το χρησιμοποίησα.', 'tool.in': 'Χρησιμοποιήθηκε σε', 'tool.clear': 'Καθαρισμός', 'proj.play': 'Παίξε τη διαδρομή', 'proj.replay': 'Ξανά', 'proj.pipeline': 'Ροή', 'proj.learned2': 'Τι έμαθα', 'proj.code': 'Ο κώδικας στο GitHub',
      'certs.label': 'Υπόβαθρο', 'certs.title': 'Σπουδές & Πιστοποιήσεις',
      'certs.edu': 'Σπουδές', 'certs.courses': 'Πιστοποιήσεις & Εκπαίδευση', 'certs.lang': 'Γλώσσες',
      'certs.prep': 'Σε προετοιμασία', 'certs.done': 'Ολοκληρώθηκε',
      'contact.label': 'Επικοινωνία', 'contact.title': 'Ας μιλήσουμε',
      'contact.text': 'Ανοιχτός σε θέσεις IT Administrator και systems στην Αθήνα, υβριδικά ή remote. Ο πιο γρήγορος τρόπος να με βρείτε είναι το email.',
      'contact.email': 'Στείλτε email', 'contact.copy': 'Αντιγραφή email', 'contact.copied': 'Αντιγράφηκε',
      'footer': 'Φτιαγμένο με HTML, CSS & vanilla JavaScript, με τη βοήθεια του Claude · Φιλοξενείται στο GitHub Pages',
      'theme.toggle': 'Αλλαγή φωτεινού / σκοτεινού θέματος', 'lang.toggle': 'EN/ΕΛ — αλλαγή γλώσσας',
      'term.title': 'pkola@lab: ~', 'term.close': 'Κλείσιμο terminal'
    }
  },

  roles: {
    en: ['IT Administrator', 'Identity & Access', 'Endpoint Management', 'Windows Server · AD (lab)'],
    el: ['IT Administrator', 'Ταυτότητες & Πρόσβαση', 'Διαχείριση Endpoints', 'Windows Server · AD (lab)']
  },

  stack: [
    { icon: 'lock', title: { en: 'Identity & Access', el: 'Ταυτότητες & Πρόσβαση' },
      tags: ['Google Workspace Admin', 'Microsoft 365 Admin', 'MFA', 'RBAC', 'Onboarding / Offboarding'] },
    { icon: 'shield', title: { en: 'Endpoint Security', el: 'Ασφάλεια Endpoints' },
      tags: ['SentinelOne', 'Trend Micro Apex One', 'Bitdefender', 'NinjaRMM', 'Patch Management'] },
    { icon: 'device', title: { en: 'Devices & Service Desk', el: 'Συσκευές & Service Desk' },
      tags: ['JumpCloud MDM', 'Snipe-IT', 'Jira Service Management', 'TeamViewer', 'Windows · macOS · iOS'] },
    { icon: 'server', title: { en: 'Servers & Networking', el: 'Servers & Δίκτυα' },
      tags: ['Windows Server 2022 (lab)', 'AD DS · DNS', 'Hyper-V', 'TCP/IP · DHCP', 'Wireshark', 'Packet Tracer', '3CX'] }
  ],

  /* Words to look for in the page text when a tool tag is clicked. A tag not listed here is searched for by its own name. */
  toolKeys: {
    'Google Workspace Admin': ['google workspace'],
    'Microsoft 365 Admin': ['microsoft 365'],
    'RBAC': ['role-based', 'βάσει ρόλων'],
    'Onboarding / Offboarding': ['onboarding'],
    'Trend Micro Apex One': ['trend micro'],
    'Patch Management': ['patched', 'patching'],
    'JumpCloud MDM': ['jumpcloud'],
    'Windows · macOS · iOS': [],
    'Windows Server 2022 (lab)': ['windows server'],
    'AD DS · DNS': ['active directory', 'ad ds'],
    'TCP/IP · DHCP': ['dhcp'],
    'Packet Tracer': []
  },

  experience: [
    {
      title: { en: 'Automation Engineer', el: 'Μηχανικός Αυτοματισμών' },
      org: 'Velcotech G.P.', place: { en: 'Athens', el: 'Αθήνα' },
      period: { en: 'Mar 2025 — Feb 2026', el: 'Μάρ 2025 — Φεβ 2026' },
      scope: { en: 'Field role outside IT: electrical automation and control systems for hotel and spa installations.',
               el: 'Ρόλος πεδίου εκτός IT: ηλεκτρικοί αυτοματισμοί και συστήματα ελέγχου για ξενοδοχεία και εγκαταστάσεις spa.' },
      groups: [{ bullets: [
        { en: 'Worked on client sites as part of an installation crew, diagnosing and repairing faults on live systems to a fixed schedule, where downtime directly affected the client’s guests.',
          el: 'Εργάστηκα σε χώρους πελατών ως μέλος συνεργείου εγκατάστασης, εντοπίζοντας και επισκευάζοντας βλάβες σε συστήματα σε λειτουργία με αυστηρό χρονοδιάγραμμα, όπου κάθε διακοπή επηρέαζε άμεσα τους επισκέπτες του πελάτη.' },
        { en: 'Documented installed configurations for handover and coordinated daily with the crew, contractors and client staff.',
          el: 'Κατέγραφα τις εγκατεστημένες ρυθμίσεις για την παράδοση και συντονιζόμουν καθημερινά με το συνεργείο, τους εργολάβους και το προσωπικό του πελάτη.' }
      ] }]
    },
    {
      title: { en: 'IT Administrator', el: 'IT Administrator' },
      org: 'Dialectica', place: { en: 'Piraeus', el: 'Πειραιάς' },
      period: { en: 'Jan 2025 — Mar 2025', el: 'Ιαν 2025 — Μάρ 2025' },
      scope: { en: 'Administration and end-user support across Microsoft 365, Google Workspace and NinjaRMM.',
               el: 'Διαχείριση και υποστήριξη χρηστών σε Microsoft 365, Google Workspace και NinjaRMM.' },
      groups: [{ bullets: [
        { en: 'Provided on-site and remote end-user support via TeamViewer across Windows and macOS.',
          el: 'Υποστήριξη χρηστών on-site και απομακρυσμένα μέσω TeamViewer σε Windows και macOS.' },
        { en: 'Handled onboarding, offboarding and access roles across Google Workspace and Jira, and administered Microsoft 365, Atlassian, Slack, Zoom and NinjaRMM.',
          el: 'Onboarding, offboarding και ρόλοι πρόσβασης σε Google Workspace και Jira· διαχείριση Microsoft 365, Atlassian, Slack, Zoom και NinjaRMM.' },
        { en: 'Tracked IT assets in Snipe-IT and monitored endpoint security alerts in Bitdefender.',
          el: 'Παρακολούθηση του IT εξοπλισμού στο Snipe-IT και των ειδοποιήσεων ασφαλείας endpoints στο Bitdefender.' },
        { en: 'Configured and maintained hardware, software, printers and scanners, and resolved high-priority incidents to restore service quickly.',
          el: 'Ρύθμιση και συντήρηση υλικού, λογισμικού, εκτυπωτών και σαρωτών· επίλυση περιστατικών υψηλής προτεραιότητας για γρήγορη αποκατάσταση της υπηρεσίας.' }
      ] }]
    },
    {
      title: { en: 'IT Administrator / IT Support Officer', el: 'IT Administrator / IT Support Officer' },
      org: 'Blueground', place: { en: 'Athens', el: 'Αθήνα' },
      period: { en: 'Nov 2021 — Dec 2024', el: 'Νοέ 2021 — Δεκ 2024' },
      scope: { en: 'Supported a distributed company across 22 countries and six time zones; promoted from IT Support Officer to IT Administrator.',
               el: 'Υποστήριξη εταιρείας σε 22 χώρες και έξι ζώνες ώρας· προαγωγή από IT Support Officer σε IT Administrator.' },
      groups: [
        { sub: { en: 'Information Technology Administrator', el: 'Information Technology Administrator' },
          period: { en: 'Feb 2023 — Dec 2024', el: 'Φεβ 2023 — Δεκ 2024' }, bullets: [
          { en: 'Handled equipment from purchase to decommissioning for office and remote staff: procurement, inventory, setup and secure retirement, tracked in JumpCloud.',
            el: 'Ανέλαβα τον εξοπλισμό από την αγορά μέχρι την απόσυρση για προσωπικό γραφείου και remote: προμήθεια, απογραφή, παραμετροποίηση και ασφαλής απόσυρση, με καταγραφή στο JumpCloud.' },
          { en: 'Standardised desktop images and network settings and wrote up the Desktop, LAN and WAN standards, so every machine was set up the same way.',
            el: 'Τυποποίησα τα desktop images και τις ρυθμίσεις δικτύου και έγραψα τα πρότυπα Desktop, LAN και WAN, ώστε κάθε μηχάνημα να στήνεται με τον ίδιο τρόπο.' },
          { en: 'Patched endpoints and followed up security alerts in SentinelOne and Trend Micro Apex One.',
            el: 'Ενημέρωση (patching) των endpoints και παρακολούθηση των ειδοποιήσεων ασφαλείας σε SentinelOne και Trend Micro Apex One.' }
        ] },
        { sub: { en: 'Information Technology Support Officer', el: 'Information Technology Support Officer' },
          period: { en: 'Nov 2021 — Feb 2023', el: 'Νοέ 2021 — Φεβ 2023' }, bullets: [
          { en: 'First contact for users in 22 countries and six time zones through Jira Service Management. I triaged tickets, worked to SLA and escalated serious issues with full notes.',
            el: 'Πρώτο σημείο επαφής για χρήστες σε 22 χώρες και έξι ζώνες ώρας μέσω Jira Service Management. Έκανα διαλογή στα tickets, δούλευα με βάση τα SLA και κλιμάκωνα τα σοβαρά θέματα με πλήρεις σημειώσεις.' },
          { en: 'Managed user accounts and access across Google Workspace, Slack and Jira, and devices and policies through JumpCloud MDM.',
            el: 'Διαχείριση λογαριασμών και πρόσβασης σε Google Workspace, Slack και Jira, και συσκευών και πολιτικών μέσω JumpCloud MDM.' },
          { en: 'Administered and supported the company cloud telephone system (3CX): extensions, user issues and day-to-day changes.',
            el: 'Διαχείριση και υποστήριξη του cloud τηλεφωνικού κέντρου της εταιρείας (3CX): εσωτερικά, προβλήματα χρηστών και καθημερινές αλλαγές.' }
        ] }
      ]
    },
    {
      title: { en: 'Technical Support Engineer', el: 'Technical Support Engineer' },
      org: 'iSystem Greece', place: { en: 'Halandri', el: 'Χαλάνδρι' },
      period: { en: 'Dec 2018 — Nov 2021', el: 'Δεκ 2018 — Νοέ 2021' },
      scope: { en: 'Apple Certified Macintosh and iOS Technician handling hardware and software repair.',
               el: 'Apple Certified Macintosh & iOS Technician — επισκευές υλικού και λογισμικού.' },
      groups: [{ bullets: [
        { en: 'Diagnosed and repaired macOS and iOS devices as an Apple Certified Macintosh and iOS Technician, including component-level hardware work.',
          el: 'Διάγνωση και επισκευή συσκευών macOS και iOS ως Apple Certified Macintosh και iOS Technician, μαζί με εργασίες υλικού σε επίπεδο εξαρτημάτων.' },
        { en: 'Dealt directly with customers at the service desk: understood the problem, explained the fix and the options, and handled difficult conversations calmly.',
          el: 'Άμεση επαφή με πελάτες στο service desk: κατανόηση του προβλήματος, εξήγηση της λύσης και των επιλογών, ψύχραιμος χειρισμός δύσκολων συζητήσεων.' },
        { en: 'Resolved escalated issues through structured troubleshooting and defined escalation paths, within service SLAs.',
          el: 'Επίλυση κλιμακωμένων θεμάτων με δομημένο troubleshooting και καθορισμένες διαδικασίες κλιμάκωσης, εντός SLA.' }
      ] }]
    },
    {
      title: { en: 'IT Store Support', el: 'IT Store Support' },
      org: 'Retail World A.E. (Public)', place: { en: 'Athens', el: 'Αθήνα' },
      period: { en: 'Jul 2016 — Nov 2018', el: 'Ιούλ 2016 — Νοέ 2018' },
      scope: { en: 'Front-line support for POS and in-store systems, meeting monthly KPI targets.',
               el: 'Υποστήριξη πρώτης γραμμής για POS και συστήματα καταστήματος, με μηνιαίους στόχους KPI.' },
      groups: [{ bullets: [
        { en: 'Front-line support for laptops, desktops and mobile devices, guiding non-technical customers to a solution.',
          el: 'Υποστήριξη πρώτης γραμμής για laptops, desktops και κινητές συσκευές, καθοδηγώντας μη τεχνικούς πελάτες στη λύση.' },
        { en: 'Supported point-of-sale and in-store IT systems: device configuration and preventive maintenance to reduce downtime.',
          el: 'Υποστήριξη POS και IT συστημάτων καταστήματος: ρύθμιση συσκευών και προληπτική συντήρηση για λιγότερο downtime.' },
        { en: 'Met monthly KPIs for customer satisfaction and response times.',
          el: 'Επίτευξη μηνιαίων KPI για ικανοποίηση πελατών και χρόνους απόκρισης.' }
      ] }]
    }
  ],

  incidents: [
    { cmd: 'ping 192.168.10.10',
      title: { en: 'The DC had the client’s IP address', el: 'Ο DC είχε την IP του client' },
      body: { en: 'The ping returned “Destination host unreachable” from the machine’s own address: nobody owned the address I was asking for — the packet was not lost in transit.',
              el: 'Το ping επέστρεψε «Destination host unreachable» από τη δική του διεύθυνση: κανείς δεν είχε τη διεύθυνση που ζητούσα — το πακέτο δεν χάθηκε στη διαδρομή.' },
      lesson: { en: 'Unreachable vs timed out now decides where I start a network fault.',
                el: 'Η διαφορά unreachable και timed out ορίζει πλέον από πού ξεκινάω ένα πρόβλημα δικτύου.' } },
    { cmd: 'nltest /dsregdns',
      title: { en: 'DNS still pointed at the old address', el: 'Το DNS έδειχνε ακόμα την παλιά διεύθυνση' },
      body: { en: 'After fixing the IP, dcdiag reported registration failures for every SRV record.',
              el: 'Μετά τη διόρθωση της IP, το dcdiag έβγαζε αποτυχίες εγγραφής για κάθε SRV record.' },
      lesson: { en: 'Don’t recreate records by hand — make the service that owns them register again, then restart Netlogon.',
                el: 'Όχι χειροκίνητη αναδημιουργία records — η υπηρεσία που τα κατέχει κάνει ξανά εγγραφή, μετά restart στο Netlogon.' } },
    { cmd: 'dcdiag',
      title: { en: 'Chasing errors that were already fixed', el: 'Κυνηγούσα σφάλματα που είχαν ήδη λυθεί' },
      body: { en: 'dcdiag reads the System event log, including old entries from the window when the machine was still misconfigured.',
              el: 'Το dcdiag διαβάζει το System event log, μαζί με παλιές εγγραφές από όταν το μηχάνημα ήταν ακόμα λάθος ρυθμισμένο.' },
      lesson: { en: 'Read the timestamp before chasing the error.', el: 'Πρώτα το timestamp, μετά το σφάλμα.' } },
    { cmd: 'rename → reboot → join',
      title: { en: 'Rename and domain join in one step fails', el: 'Μετονομασία και domain join μαζί αποτυγχάνει' },
      body: { en: 'The join succeeds, then reports “Changing the Primary Domain DNS name … failed”, because a rename only takes effect after a reboot.',
              el: 'Το join πετυχαίνει και αμέσως βγάζει «Changing the Primary Domain DNS name … failed», γιατί η μετονομασία ισχύει μόνο μετά από επανεκκίνηση.' },
      lesson: { en: 'Rename, reboot, then join.', el: 'Μετονομασία, επανεκκίνηση, μετά join.' } },
    { cmd: 'Gen 2 VM · vTPM',
      title: { en: 'Windows 11 would not install on a Gen 2 VM', el: 'Τα Windows 11 δεν εγκαθίσταντο σε Gen 2 VM' },
      body: { en: 'Hyper-V provides a virtual TPM, but it is disabled by default.',
              el: 'Το Hyper-V έχει virtual TPM, αλλά είναι απενεργοποιημένο από προεπιλογή.' },
      lesson: { en: 'Settings → Security → Enable Trusted Platform Module.', el: 'Settings → Security → Enable Trusted Platform Module.' } }
  ],

  /* Before/after line for each incident above, same order. Edit the wording here. */
  incidentStates: [
    { before: { en: 'Reply from 192.168.10.50: Destination host unreachable.', el: 'Reply from 192.168.10.50: Destination host unreachable.' },
      after:  { en: 'Reply from 192.168.10.10: bytes=32 time<1ms TTL=128', el: 'Reply from 192.168.10.10: bytes=32 time<1ms TTL=128' } },
    { before: { en: 'dcdiag: DNS registration failed for every SRV record', el: 'dcdiag: αποτυχία εγγραφής DNS για κάθε SRV record' },
      after:  { en: 'nltest /dsregdns: records registered again, Netlogon restarted', el: 'nltest /dsregdns: τα records ξαναεγγράφηκαν, restart στο Netlogon' } },
    { before: { en: 'dcdiag: errors in the System event log', el: 'dcdiag: σφάλματα στο System event log' },
      after:  { en: 'Same errors, but their timestamps predate the fix: nothing left to fix', el: 'Ίδια σφάλματα, αλλά με timestamp πριν τη διόρθωση: δεν υπάρχει τίποτα να διορθωθεί' } },
    { before: { en: 'Join succeeded, then: “Changing the Primary Domain DNS name … failed”', el: 'Το join πέτυχε και μετά: «Changing the Primary Domain DNS name … failed»' },
      after:  { en: 'Rename, reboot, then join: no error', el: 'Μετονομασία, επανεκκίνηση, μετά join: χωρίς σφάλμα' } },
    { before: { en: 'Windows 11 setup blocked: no TPM available', el: 'Η εγκατάσταση Windows 11 μπλοκάρει: δεν υπάρχει TPM' },
      after:  { en: 'Enable Trusted Platform Module: setup continues', el: 'Enable Trusted Platform Module: η εγκατάσταση συνεχίζεται' } }
  ],

  roadmap: [
    { done: true,  en: 'Hyper-V host and isolated “LAB” internal switch (192.168.10.0/24)', el: 'Hyper-V host και απομονωμένο internal switch «LAB» (192.168.10.0/24)' },
    { done: true,  en: 'DC01: AD DS, new forest lab.local, integrated DNS', el: 'DC01: AD DS, νέο forest lab.local, ενσωματωμένο DNS' },
    { done: true,  en: 'CLIENT01: Windows 11 domain join, verified with nltest and dcdiag', el: 'CLIENT01: domain join Windows 11, επαλήθευση με nltest και dcdiag' },
    { done: false, en: 'DHCP scope, options and reservations — then break it on purpose to see APIPA', el: 'DHCP scope, options και reservations — και σκόπιμη βλάβη για να δω APIPA' },
    { done: false, en: 'OU structure, users and groups following AGDLP', el: 'Δομή OU, χρήστες και ομάδες κατά AGDLP' },
    { done: false, en: 'Group Policy: drive mapping, password policy, Enforced vs Block Inheritance', el: 'Group Policy: drive mapping, password policy, Enforced vs Block Inheritance' },
    { done: false, en: 'File server with share and NTFS permissions', el: 'File server με share και NTFS δικαιώματα' },
    { done: false, en: 'Packet capture of DHCP and DNS traffic in Wireshark', el: 'Καταγραφή κίνησης DHCP και DNS στο Wireshark' }
  ],

  projects: [
    {
      title: { en: 'Self-hosted Web Analytics', el: 'Self-hosted Web Analytics' },
      tagline: { en: 'Visitor analytics for this site, on a server I run myself',
                 el: 'Στατιστικά επισκεπτών για αυτό το site, σε server που διαχειρίζομαι ο ίδιος' },
      period: '2026',
      status: { en: 'Live', el: 'Σε λειτουργία' },
      repo: 'https://github.com/panoskola/site-analytics',
      desc: { en: 'Umami analytics on an Oracle Cloud Always Free VM (Ubuntu 24.04, Ampere ARM). Docker Compose runs Caddy, Umami and PostgreSQL; Caddy obtains and renews the Let’s Encrypt certificate on its own. Only ports 22, 80 and 443 are open, the database stays on the internal Docker network, and a nightly pg_dump keeps 14 days of backups. Cookieless, so the site needs no consent banner.',
              el: 'Umami analytics σε Oracle Cloud Always Free VM (Ubuntu 24.04, Ampere ARM). Το Docker Compose τρέχει Caddy, Umami και PostgreSQL· ο Caddy εκδίδει και ανανεώνει μόνος του το πιστοποιητικό Let’s Encrypt. Ανοιχτές είναι μόνο οι θύρες 22, 80 και 443, η βάση μένει στο εσωτερικό δίκτυο του Docker και ένα νυχτερινό pg_dump κρατάει backups 14 ημερών. Χωρίς cookies, οπότε το site δεν χρειάζεται banner συναίνεσης.' },
      flow: ['panoskola.github.io', 'script.js', 'DuckDNS', 'Caddy · HTTPS', 'Umami', 'PostgreSQL'],
      steps: [
        { en: 'A visitor opens the site.', el: 'Ένας επισκέπτης ανοίγει τον ιστότοπο.' },
        { en: 'The page loads the Umami tracking script.', el: 'Η σελίδα φορτώνει το script παρακολούθησης του Umami.' },
        { en: 'The script’s address is resolved through DuckDNS to my Oracle Cloud VM.', el: 'Η διεύθυνση του script επιλύεται μέσω DuckDNS στο VM μου στο Oracle Cloud.' },
        { en: 'Caddy answers on port 443 and handles the Let’s Encrypt certificate itself.', el: 'Ο Caddy απαντά στη θύρα 443 και διαχειρίζεται μόνος του το πιστοποιητικό Let’s Encrypt.' },
        { en: 'Umami counts the visit. It sets no cookies, so the site needs no consent banner.', el: 'Το Umami μετράει την επίσκεψη. Δεν βάζει cookies, οπότε δεν χρειάζεται banner συναίνεσης.' },
        { en: 'The record is saved in PostgreSQL, which is only reachable on the internal Docker network.', el: 'Η εγγραφή αποθηκεύεται στην PostgreSQL, που φαίνεται μόνο στο εσωτερικό δίκτυο του Docker.' }
      ],
      tags: ['Oracle Cloud (OCI)', 'Ubuntu 24.04', 'Docker Compose', 'Caddy', 'PostgreSQL 16', 'Let’s Encrypt', 'DuckDNS', 'iptables', 'cron'],
      lessons: [
        { en: 'The VM came up on end-of-life Ubuntu 20.04 and Docker would not install. I rebuilt it on 24.04 instead of patching around it.',
          el: 'Το VM σηκώθηκε με Ubuntu 20.04, εκτός υποστήριξης, και το Docker δεν εγκαθίστατο. Το ξανάστησα σε 24.04 αντί να το μπαλώσω.' },
        { en: 'A running instance is not a reachable one: it had no public IP, then the cloud security list and the host’s iptables both had to allow 80/443.',
          el: 'Ένα instance που τρέχει δεν είναι απαραίτητα προσβάσιμο: δεν είχε public IP, και μετά έπρεπε να ανοίξουν οι 80/443 και στο security list και στο iptables του host.' },
        { en: 'Docker group membership applies only after a new login. Verify with groups before blaming Docker.',
          el: 'Η ένταξη στο group docker ισχύει μόνο μετά από νέο login. Πρώτα έλεγχος με groups, μετά υποψίες για το Docker.' },
        { en: 'The dashboard counted nothing because the site sent a placeholder website ID. Copy identifiers from the source, never from an example.',
          el: 'Το dashboard δεν μετρούσε τίποτα γιατί το site έστελνε placeholder website ID. Τα αναγνωριστικά αντιγράφονται από την πηγή, ποτέ από παράδειγμα.' }
      ]
    },
    {
      title: { en: 'World Cup Discord Bot', el: 'World Cup Discord Bot' },
      tagline: { en: 'Daily World Cup 2026 fixtures and results in a Discord server — built for fun',
                 el: 'Καθημερινά οι αγώνες και τα αποτελέσματα του Μουντιάλ 2026 σε Discord server — φτιαγμένο για πλάκα' },
      period: '2026',
      status: { en: 'For fun', el: 'For fun' },
      repo: 'https://github.com/panoskola/worldcup-discord-bot',
      repoKey: 'proj.code', flowKey: 'proj.pipeline', learnedKey: 'proj.learned2',
      desc: { en: 'Two Python scripts that run on a schedule in GitHub Actions, so there is no server to maintain. Every morning they pull the day’s fixtures and the previous day’s results from the football-data.org REST API and post them to a Discord channel through a webhook, one embed card per match: kickoff times in Greek time before the games, final scores with the winner marked after them. The API token and the webhook URL are stored as GitHub Actions secrets.',
              el: 'Δύο Python scripts που τρέχουν προγραμματισμένα στο GitHub Actions, χωρίς server να συντηρώ. Κάθε πρωί τραβάνε τους αγώνες της ημέρας και τα αποτελέσματα της προηγούμενης από το REST API του football-data.org και τα στέλνουν σε κανάλι Discord μέσω webhook, μία κάρτα (embed) ανά αγώνα: ώρα έναρξης σε ώρα Ελλάδας πριν τα παιχνίδια, τελικό σκορ με σημειωμένο νικητή μετά. Το API token και το webhook URL φυλάσσονται ως GitHub Actions secrets.' },
      flow: ['GitHub Actions · cron', 'Python 3.12', 'football-data.org API', 'Discord webhook'],
      steps: [
        { en: 'A scheduled GitHub Actions job starts every morning.', el: 'Μια προγραμματισμένη εργασία του GitHub Actions ξεκινά κάθε πρωί.' },
        { en: 'A Python script runs and reads the API token and webhook URL from GitHub Actions secrets.', el: 'Τρέχει ένα Python script που διαβάζει το API token και το webhook URL από τα GitHub Actions secrets.' },
        { en: 'It asks football-data.org for the day’s fixtures and the previous day’s results.', el: 'Ζητά από το football-data.org τους αγώνες της ημέρας και τα αποτελέσματα της προηγούμενης.' },
        { en: 'It posts one card per match to the Discord channel through the webhook.', el: 'Στέλνει μία κάρτα ανά αγώνα στο κανάλι Discord μέσω του webhook.' }
      ],
      tags: ['Python 3.12', 'requests', 'GitHub Actions', 'cron', 'REST API', 'Discord webhooks', 'GitHub Secrets', 'zoneinfo'],
      lessons: [
        { en: 'Matches landed on the wrong day: Greek midnight split the tournament’s match days. The fix was to anchor the “match day” to US Eastern time, like the official schedules, and only display kickoff times in Greek time.',
          el: 'Οι αγώνες έπεφταν σε λάθος μέρα: τα μεσάνυχτα Ελλάδας «έσπαγαν» τις αγωνιστικές. Η λύση ήταν να ορίζεται η «μέρα αγώνων» με βάση την ώρα ανατολικής ακτής ΗΠΑ, όπως στα επίσημα προγράμματα, και η ώρα Ελλάδας να χρησιμοποιείται μόνο για εμφάνιση.' },
        { en: 'One US day spans two UTC dates, so the API is queried one day either side and the matches are filtered precisely afterwards.',
          el: 'Μία μέρα στις ΗΠΑ πιάνει δύο ημερομηνίες UTC, οπότε το API ρωτιέται για μία μέρα πριν και μία μετά και τα αποτελέσματα φιλτράρονται με ακρίβεια μετά.' },
        { en: 'Secrets stay out of the code: both scripts read the token and webhook from environment variables and stop with a clear error if either is missing.',
          el: 'Τα secrets μένουν έξω από τον κώδικα: τα scripts διαβάζουν token και webhook από μεταβλητές περιβάλλοντος και σταματούν με σαφές μήνυμα αν λείπει κάποιο.' }
      ]
    }
  ],

  certs: [
    { name: 'CompTIA Network+ (N10-009)', by: 'CompTIA', prep: true },
    { name: 'Apple Certified Macintosh Technician (ACMT)', by: 'Apple' },
    { name: 'Apple Certified iOS Technician & Apple Professional Support', by: 'Apple' },
    { name: 'IT Security Foundations: Network Security', by: 'LinkedIn Learning' }
  ],

  education: {
    name: { en: 'Vocational Diploma (EQF Level 5), Electrical Automation & Robotics',
            el: 'Δίπλωμα ΙΕΚ (Επίπεδο 5), Ηλεκτρικοί Αυτοματισμοί & Ρομποτική' },
    school: { en: 'IEK Delta, Athens', el: 'ΙΕΚ Δέλτα, Αθήνα' }, years: '2014 — 2016'
  },

  iac: {
    tags: ['Terraform', 'Ansible', 'Ansible Vault', 'GitHub Actions', 'Oracle Cloud (OCI)', 'Prometheus', 'Alertmanager', 'Docker Compose', 'fail2ban', 'iptables'],
    pipeline: [
      { node: 'git push', sub: 'maintainer → GitHub',
        text: { en: 'The maintainer pushes to GitHub.', el: 'Ο maintainer κάνει push στο GitHub.' } },
      { node: 'CI', sub: 'yamllint · ansible-lint · terraform validate',
        text: { en: 'CI runs yamllint, ansible-lint (production profile), terraform fmt -check and terraform validate. No cloud credentials are needed.',
                el: 'Το CI τρέχει yamllint, ansible-lint (production profile), terraform fmt -check και terraform validate. Δεν χρειάζονται cloud credentials.' } },
      { node: 'Approval', sub: 'GitHub environment · required reviewer',
        text: { en: 'The deploy job waits for a required reviewer. Secrets are released only after approval, and only on main.',
                el: 'Το deploy job περιμένει υποχρεωτικό reviewer. Τα secrets ελευθερώνονται μόνο μετά την έγκριση και μόνο στο main.' } },
      { node: 'ansible-playbook', sub: 'over SSH · dedicated deploy key',
        text: { en: 'Approved: ansible-playbook runs over SSH with a dedicated deploy key, the same command a maintainer would run by hand.',
                el: 'Εγκρίθηκε: το ansible-playbook τρέχει πάνω από SSH με ξεχωριστό deploy key, η ίδια εντολή που θα έτρεχα και χειροκίνητα.' } },
      { node: 'VM', sub: 'Ubuntu 24.04 · A1 Flex arm64',
        text: { en: 'The VM converges: SSH hardening, firewall, Docker stack, monitoring and backups.',
                el: 'Το VM συγκλίνει: SSH hardening, firewall, Docker stack, monitoring και backups.' } },
      { node: 'changed=0', sub: 'idempotent roles',
        text: { en: 'Every role is idempotent, so a deploy of an unchanged repository reports changed=0.',
                el: 'Κάθε role είναι idempotent, οπότε ένα deploy αμετάβλητου repository αναφέρει changed=0.' } }
    ],
    security: [
      { title: { en: 'Secrets in Ansible Vault', el: 'Secrets στο Ansible Vault' },
        why: { en: 'Application secrets and the Discord webhook are AES256-encrypted in the repo. Terraform variables and state stay local and git-ignored; only an example file is committed.',
               el: 'Τα secrets της εφαρμογής και το webhook του Discord είναι κρυπτογραφημένα με AES256 στο repo. Οι μεταβλητές και το state του Terraform μένουν τοπικά και git-ignored· μόνο ένα example αρχείο γίνεται commit.' } },
      { title: { en: 'No cloud credentials on the server', el: 'Χωρίς cloud credentials στον server' },
        why: { en: 'The VM authenticates to Object Storage as itself (instance principal via a dynamic group). The policy allows only reading and writing objects in the one backup bucket.',
               el: 'Το VM αυθεντικοποιείται στο Object Storage ως ο εαυτός του (instance principal μέσω dynamic group). Η πολιτική επιτρέπει μόνο ανάγνωση και εγγραφή αντικειμένων στο ένα bucket των backups.' } },
      { title: { en: 'Dedicated deploy key', el: 'Ξεχωριστό deploy key' },
        why: { en: 'GitHub Actions uses its own SSH key, separate from mine, so it can be revoked without side effects.',
               el: 'Το GitHub Actions χρησιμοποιεί δικό του SSH key, ξεχωριστό από το δικό μου, ώστε να ανακαλείται χωρίς παρενέργειες.' } },
      { title: { en: 'Approval gate', el: 'Gate έγκρισης' },
        why: { en: 'Deployments run in a GitHub environment with a required reviewer. Secrets are environment secrets, available only to jobs that pass the gate and only on main.',
               el: 'Τα deployments τρέχουν σε GitHub environment με υποχρεωτικό reviewer. Τα secrets είναι environment secrets, διαθέσιμα μόνο σε jobs που περνούν το gate και μόνο στο main.' } },
      { title: { en: 'Hardened host', el: 'Σκληρυμένος host' },
        why: { en: 'SSH accepts keys only, root login is off, fail2ban is active, and the sshd config is validated with sshd -t before it is applied.',
               el: 'Το SSH δέχεται μόνο keys, το root login είναι κλειστό, το fail2ban ενεργό, και η ρύθμιση του sshd ελέγχεται με sshd -t πριν εφαρμοστεί.' } },
      { title: { en: 'Pinned versions', el: 'Καρφωμένες εκδόσεις' },
        why: { en: 'Container images, the application version and the CI tools are pinned. Nothing runs on latest, so a deploy of the same commit does the same thing next month.',
               el: 'Τα container images, η έκδοση της εφαρμογής και τα εργαλεία του CI είναι καρφωμένα. Τίποτα δεν τρέχει σε latest, οπότε ένα deploy του ίδιου commit κάνει το ίδιο και τον επόμενο μήνα.' } },
      { title: { en: 'Weekly restore test', el: 'Εβδομαδιαίο restore test' },
        why: { en: 'Every Sunday the newest backup is restored into a throwaway database and checked, so I know it works before I need it.',
               el: 'Κάθε Κυριακή το νεότερο backup γίνεται restore σε προσωρινή βάση και ελέγχεται, ώστε να ξέρω ότι δουλεύει πριν το χρειαστώ.' } }
    ]
  },

  iacIncidents: [
    { cmd: 'sshd -T | grep -i permitrootlogin',
      title: { en: 'SSH hardening silently ignored', el: 'Το SSH hardening αγνοούνταν σιωπηλά' },
      body: { en: 'On cloud images the provider’s 60-cloudimg-settings.conf is read before my drop-in, and sshd uses the first value it sees.',
              el: 'Στα cloud images το 60-cloudimg-settings.conf του provider διαβάζεται πριν από το δικό μου drop-in, και ο sshd κρατά την πρώτη τιμή που βλέπει.' },
      lesson: { en: 'Naming the drop-in 01-hardening.conf fixed the order. Verify effective configuration with sshd -T, not by reading files.',
                el: 'Το όνομα 01-hardening.conf διόρθωσε τη σειρά. Την ενεργή ρύθμιση την ελέγχω με sshd -T, όχι διαβάζοντας αρχεία.' } },
    { cmd: 'git update-index --chmod=+x scripts/*.sh',
      title: { en: 'Ansible git module refused to update', el: 'Το git module του Ansible αρνιόταν να κάνει update' },
      body: { en: 'Making scripts executable on the server created local modifications, so the next pull failed.',
              el: 'Το να κάνω τα scripts εκτελέσιμα στον server δημιουργούσε τοπικές αλλαγές, και το επόμενο pull αποτύγχανε.' },
      lesson: { en: 'The mode belongs in git, not in a post-clone chmod.', el: 'Το mode ανήκει στο git, όχι σε chmod μετά το clone.' } },
    { cmd: 'changed_when: real container changes only',
      title: { en: 'changed=1 on every run', el: 'changed=1 σε κάθε εκτέλεση' },
      body: { en: 'docker_compose_v2 counts a “Waiting” health-check event as a change, so an unchanged deploy never reported changed=0.',
              el: 'Το docker_compose_v2 μετράει ένα event “Waiting” του health-check ως αλλαγή, οπότε ένα αμετάβλητο deploy δεν έβγαζε ποτέ changed=0.' },
      lesson: { en: 'I read the module’s returned actions and wrote a changed_when that counts only real container changes. The deploy report is trustworthy again.',
                el: 'Διάβασα τα actions που επιστρέφει το module και έγραψα changed_when που μετράει μόνο πραγματικές αλλαγές containers. Η αναφορά του deploy είναι ξανά αξιόπιστη.' } }
  ],

  languages: {
    en: ['Greek — Native', 'English — B2 (professional working)'],
    el: ['Ελληνικά — Μητρική', 'Αγγλικά — B2 (επαγγελματικό επίπεδο)']
  }
};
